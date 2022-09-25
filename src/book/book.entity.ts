import { User_ } from 'src/user/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'integer'})
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  author: string;
  
  @CreateDateColumn({type: 'date'})
  createdat: Date;

  @ManyToMany(() => User_, user => user.books)
  users: User_[];
}
