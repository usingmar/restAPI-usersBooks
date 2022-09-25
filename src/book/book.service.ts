import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_ } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';

import { Book } from './book.entity';
import { CreateBookDTO } from './dto/createBook.dto';
import { PutBookDTO } from './dto/putBook.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: { users: true },
    });
  }

  async findOne(_id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: _id },
      relations: { users: true },
    });
    if (!book) {
      throw new HttpException(
        {
          message: `Book with id: ${_id} does not exists`,
        },
        400,
      );
    }
    return book;
  }

  async create(DTO: CreateBookDTO): Promise<Book> {
    const newBook = {
      ...DTO,
    };

    const created = await this.bookRepository.save(newBook);
    return this.findOne(created.id);
  }

  async update(_id: number, DTO: UpdateBookDTO | PutBookDTO): Promise<Book> {
    checkNumberOfProperties(DTO);
    const aim = await this.findOne(_id);
    const { users, ...rest } = DTO;
    const users2: User_[] = [];
    if (DTO.hasOwnProperty('users')) {
      for (const item of DTO.users) users2.push(await this.userService.exists(item));
    }
    await this.bookRepository.save({
      id: _id,
      rest,
      users: users2,
      createdat: aim.createdat,
      updatedat: new Date().toISOString().split('T')[0],
    });
    return this.findOne(_id);
  }

  async delete(_id: number): Promise<Book> {
    const aim = await this.findOne(_id);
    await this.bookRepository.delete(_id);
    return aim;
  }

  async exists(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: id } });
    if (!book) throw new NotFoundException(`book with id: ${id} was not found from exists`);
    return book;
  }
}
