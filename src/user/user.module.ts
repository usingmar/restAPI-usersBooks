import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User_ } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { BookModule } from "src/book/book.module";

@Module({
        imports: [TypeOrmModule.forFeature([User_]), forwardRef(() => BookModule)],
        providers: [UserService],
        controllers: [UserController],
        exports: [UserService]
    }
)
export class UserModule{}