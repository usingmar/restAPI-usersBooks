import { Book } from "src/book/book.entity";
import { 
    Column,
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class User_{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({type: 'varchar',length: 50, nullable: false})
    firstname: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    lastname: string;

    @Column({type: 'int2'})
    age: number;

    @Column({type: 'boolean'})
    isfree: boolean;

    @Column({type: 'date', nullable: false})
    createdat: string;
    
    @Column({type: 'date', nullable: false})
    updatedat: string;

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