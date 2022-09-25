import { Injectable, HttpException, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookService } from "src/book/book.service";
import { checkNumberOfProperties } from "src/utils/validators";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { User_ } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User_) private userRepository: Repository<User_>,
        @Inject(forwardRef(() => BookService)) private bookService: BookService
        ){console.log('user service constructor')}

    async findAll(): Promise<User_[]>{
        return await this.userRepository.find({
            relations: { books: true }
        });
    }

    async find(ids: number[]){

    }

    async findOne(_id: number): Promise<User_>{
        console.log('user find one')
        const user = await this.userRepository.findOne({
            where: {id: _id}, relations: {books: true}
        })
        if(!user) {
            throw new HttpException({
                message: `User with id: ${_id} does not exists`
            }, 400)
        }
        return user;
       /*  return await this.userRepository.findOneOrFail({
            where: { id: _id }, relations: { books: true }
        })
        .catch(() => {
            throw new HttpException(
                {
                    statusCode: '400',
                    error: 'Bad request',
                    message: `User with id: ${_id} does not exists`
                },
                400)
        }); */
    }

    async create(DTO: CreateUserDTO): Promise<User_>{
        const newUser = {
            ...DTO,
            createdat: new Date().toISOString().split('T')[0],
            updatedat: new Date().toISOString().split('T')[0]
        }
        console.log(newUser);

        const updated = await this.userRepository.save(newUser);
        return await this.findOne(updated.id);
    }

    async update(_id: number, DTO: CreateUserDTO | UpdateUserDTO): Promise<User_>{
        checkNumberOfProperties(DTO);
        const aim = await this.findOne(_id);
        await this.userRepository.save(
            {
                id: _id,
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

    async exists(ids: number[]){
        ids.forEach(async (id) => {
            console.log(this)
            await this.findOne(id);
        })
    }   
}