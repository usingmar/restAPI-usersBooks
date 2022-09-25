import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/createBook.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';

@Resolver(of => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(returns => [Book])
  async books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(returns => Book)
  async book(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findOne(id);
  }

  @Mutation(returns => Book)
  createBook(@Args('CreateBookInput') createBookInput: CreateBookDTO): Promise<Book> {
    return this.bookService.create(createBookInput);
  }

  @Mutation(returns => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('UpdateBookInput') updateBookInput: UpdateBookDTO,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookInput);
  }

  @Mutation(returns => Book)
  deleteBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.bookService.delete(id);
  }
}
