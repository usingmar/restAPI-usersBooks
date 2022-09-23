import { IsDefined } from "@nestjs/class-validator";
import {
    IsBoolean,
    IsByteLength,
    IsInt,
    IsString,
    Max,
    Min
} from "class-validator";


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
}