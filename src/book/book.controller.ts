import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/createBook.dto';
import { PutBookDTO } from './dto/putBook.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  @UsePipes()
  async create(@Body() DTO: CreateBookDTO): Promise<Book> {
    return this.bookService.create(DTO);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() DTO: PutBookDTO): Promise<Book> {
    return this.bookService.update(id, DTO);
  }

  @Patch(':id')
  async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() DTO: UpdateBookDTO): Promise<Book> {
    return this.bookService.update(id, DTO);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.delete(id);
  }
}
