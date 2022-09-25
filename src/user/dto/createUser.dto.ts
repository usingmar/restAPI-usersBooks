import { IsDefined } from "@nestjs/class-validator";
import {
    IsArray,
    IsBoolean,
    IsByteLength,
    IsInt,
    IsString,
    Max,
    Min
} from "class-validator";
import { Book } from "src/book/book.entity";


export class CreateUserDTO{
    @IsDefined()
    @IsString()
    @IsByteLength(1,49)
    firstname: string;

    @IsDefined()
    @IsString()
    @IsByteLength(1,49)
    lastname: string;

    @IsDefined()
    @IsInt()
    @Min(1)
    @Max(200)
    age: number;

    @IsDefined()
    @IsBoolean()
    isfree: boolean

    @IsDefined()
    @IsArray()
    books: Book[]
}