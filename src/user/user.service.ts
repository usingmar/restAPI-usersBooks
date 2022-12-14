import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { BookService } from 'src/book/book.service';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';

import { CreateUserDTO } from './dto/createUser.dto';
import { PutUserDTO } from './dto/putUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User_ } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User_) private userRepository: Repository<User_>,
    @Inject(forwardRef(() => BookService)) private bookService: BookService,
  ) {}

  async findAll(): Promise<User_[]> {
    return await this.userRepository.find({
      relations: { books: true },
    });
  }

  async findOne(_id: number): Promise<User_> {
    const user = await this.userRepository.findOne({
      where: { id: _id },
      relations: { books: true },
    });
    if (!user) {
      throw new HttpException(
        {
          message: `User with id: ${_id} does not exists`,
        },
        404,
      );
    }
    return user;
  }

  async create(DTO: CreateUserDTO): Promise<User_> {
    const newUser = {
      ...DTO,
    };

    const created = await this.userRepository.save(newUser);
    return this.findOne(created.id);
  }

  async update(_id: number, DTO: PutUserDTO | UpdateUserDTO): Promise<User_> {
    checkNumberOfProperties(DTO);
    await this.findOne(_id);
    const { books, ...rest } = DTO;
    const books2: Book[] = [];
    console.log(_id);

    if (DTO.hasOwnProperty('books')) {
      for (const item of DTO.books) books2.push(await this.bookService.exists(item));
    }
    const newUser = await this.userRepository.save({
      id: _id,
      ...rest,
      books: books2,
    });
    return this.findOne(_id);
  }

  async delete(_id: number): Promise<User_> {
    const aim = await this.findOne(_id);
    await this.userRepository.delete(_id);
    return aim;
  }

  async exists(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`user with id: ${id} was not found from exists`);
    return user;
  }
}
