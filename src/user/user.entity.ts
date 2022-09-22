import { 
    Column,
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({type: 'varchar',length: 50, nullable: false})
    firstName: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    lastName: string;

    @Column({type: 'int2'})
    age: number;

    @Column({type: 'boolean'})
    isFree: boolean;

    @Column({type: 'date', nullable: false})
    createdAt: Date;
    
    @Column({type: 'date', nullable: false})
    updatedAt: Date;
}