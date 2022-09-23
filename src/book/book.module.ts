import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./book.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [],
    providers: []
})
export class BookModule{}
