import { IsArray, IsByteLength, IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { User_ } from "src/user/user.entity";

export class UpdateBookDTO{
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1, 49)
    author?: string;

    @IsOptional()
    @IsArray()
    users?: User_[]   
}