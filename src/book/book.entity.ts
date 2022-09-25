import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User_ } from 'src/user/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  @Field(type => ID)
  id: number;

  @Column({ type: 'text' })
  @Field()
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Field()
  author: string;

  @CreateDateColumn({ type: 'date' })
  @Field(type => String)
  createdat: Date;

  @ManyToMany(() => User_, user => user.books)
  @Field(type => [User_!]!)
  users: User_[];
}
