import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { checkNumberOfProperties } from "src/utils/validators";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { User_ } from "./user.entity";

@Injectable()
export class UserService{
    constructor( @InjectRepository(User_) private userRepository: Repository<User_> ){}

    async findAll(): Promise<User_[]>{
        return await this.userRepository.find();
    }

    async findOne(_id: number): Promise<User_>{
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

    async create(DTO: CreateUserDTO): Promise<User_>{
        const newUser = {
            ...DTO,
            createdat: new Date().toISOString().split('T')[0],
            updatedat: new Date().toISOString().split('T')[0]
        }
        console.log(newUser);

        return await this.userRepository.save(newUser);
    }

    async update(_id: number, DTO: CreateUserDTO | UpdateUserDTO): Promise<User_>{
        checkNumberOfProperties(DTO);
        const aim = await this.findOne(_id);
        await this.userRepository.update(_id,
            {
                ...DTO,
                createdat: aim.createdat,
                updatedat: new Date().toISOString().split('T')[0]
            });
        return this.findOne(_id);
    }

    async delete(_id: number): Promise<void>{ //@HttpCode(204)
        await this.findOne(_id);
        await this.userRepository.delete(_id);
    }
}