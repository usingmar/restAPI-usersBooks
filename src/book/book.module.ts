import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { BookController } from "./book.controller";
import { Book } from "./book.entity";
import { BookService } from "./book.service";


@Module({
    imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => UserModule)],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService]
})
export class BookModule{}
