import { User_ } from "src/user/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    author: string;

    @Column({ type: 'date', nullable: false})
    createdat: string;

    @ManyToMany(() => User_, (user) => user.books)
    users: User_[];
}