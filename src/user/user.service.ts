import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { checkNumberOfProperties } from "src/utils/validators";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
        ){}

    async findAll(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async findOne(_id: number): Promise<User>{
        return await this.userRepository.findOneOrFail({
            where: { id: _id }
        })
        .catch(() => {
            throw new HttpException(
                {
                    statusCode: '400',
                    error: 'Bad request',
                    message: 'No such user'
                },
                400)
        });
    }

    async create(DTO: CreateUserDTO): Promise<User>{
        const newUser = {
            ...DTO,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        }

        return await this.userRepository.save(newUser);
    }

    async update(_id: number, DTO: CreateUserDTO | UpdateUserDTO): Promise<User>{
        checkNumberOfProperties(DTO);
        await this.findOne(_id);
        return await this.userRepository.save(
            {
                _id,
                ...DTO
            })
    }

    async delete(_id: number): Promise<void>{ //@HttpCode(204)
        await this.findOne(_id);
        await this.userRepository.delete(_id);
    }
}