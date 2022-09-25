import { IsArray, IsByteLength, IsDefined, IsInt, IsString } from "class-validator";
import { User_ } from "src/user/user.entity";

export class CreateBookDTO{
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    @IsByteLength(1,49)
    author: string;

    @IsDefined()
    @IsArray()
    users?: User_[]
}