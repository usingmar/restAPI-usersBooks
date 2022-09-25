import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { checkNumberOfProperties } from "src/utils/validators";
import { Repository } from "typeorm";
import { Book } from "./book.entity";
import { CreateBookDTO } from "./dto/createBook.dto";
import { UpdateBookDTO } from "./dto/updateBook.dto";

@Injectable()
export class BookService{
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
        @Inject(forwardRef(() => UserService)) private userService: UserService
        ){console.log('book service constructor')}

    async findAll(): Promise<Book[]>{
        return await this.bookRepository.find({
            relations: { users: true }
        }
        );
    }

    async findOne(_id: number): Promise<Book>{
        console.log('book find one')
        return await this.bookRepository.findOneOrFail({
            where: { id: _id }, relations: { users: true }
        })
        .catch(() => {
            throw new HttpException(
                {
                    statusCode: '400',
                    error: 'Bad request',
                    message: `Book with id: ${_id} does not exists`
                },
                400)
        });
    }

    async create(DTO: CreateBookDTO): Promise<Book>{
        try{
            await this.userService.exists(DTO.users.map(item => item.id))
        } catch (exception){
            throw new HttpException({
                error: exception.error,
                message: exception.message
            }, 422)
        }
        const newBook = {
            ...DTO,
            createdat: new Date().toISOString().split('T')[0]
        }

        const updated = await this.bookRepository.save(newBook);
        return this.findOne(updated.id);
    }

    async update(_id: number, DTO: CreateBookDTO | UpdateBookDTO): Promise<Book>{
        console.log('book update')
        checkNumberOfProperties(DTO);

        if(DTO.hasOwnProperty('users') && DTO.users.length != 0){
            await Promise.all(DTO.users.map(async (user) => {
                this.userService.findOne(user.id);
            }))
        }

        const aim = await this.findOne(_id);
        await this.bookRepository.save(
            {
                id: _id,
                ...DTO,
                createdat: aim.createdat,
            });
        return this.findOne(_id);
    }

    async delete(_id: number): Promise<void>{ //@HttpCode(204)
        await this.findOne(_id);
        await this.bookRepository.delete(_id);
    }

    async exists(ids: number[]): Promise<void>{
        console.log('book exists')
        ids.forEach(async (id) => {
            await this.findOne(id);
        })
    }
}