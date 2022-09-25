import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/book.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User_ {
  @PrimaryGeneratedColumn({ type: 'integer' })
  @Field(type => ID)
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Field()
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Field()
  lastname: string;

  @Column({ type: 'int2' })
  @Field(type => Int)
  age: number;

  @Column({ type: 'boolean' })
  @Field()
  isfree: boolean;

  @CreateDateColumn({ type: 'date' })
  @Field(type => String)
  createdat: Date;

  @UpdateDateColumn({ type: 'date' })
  @Field(type => String)
  updatedat: Date;

  @ManyToMany(() => Book, book => book.users, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable({
    name: 'user_book',
    joinColumn: {
      name: 'userid',
    },
    inverseJoinColumn: {
      name: 'bookid',
    },
  })
  @Field(type => [Book!]!)
  books: Book[];
}
