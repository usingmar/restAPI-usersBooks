import { Book } from "src/book/book.entity";
import { 
    Column,
    CreateDateColumn,
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";


@Entity()
export class User_{
    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'varchar',length: 50, nullable: false})
    firstname: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    lastname: string;

    @Column({type: 'int2'})
    age: number;

    @Column({type: 'boolean'})
    isfree: boolean;

    @CreateDateColumn({type: 'date'})
    createdat: Date;

    @UpdateDateColumn({type: 'date'})
    updatedat: Date

    @ManyToMany(() => Book, (book) => book.users, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinTable({
        name: 'user_book',
        joinColumn: {
            name: 'userid'
        },
        inverseJoinColumn: {
            name: 'bookid'
        }
    })
    books: Book[]
}