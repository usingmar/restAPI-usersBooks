import {
    IsBoolean,
    IsByteLength,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min
} from "class-validator";

export class UpdateUserDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1,49)
    firstname: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1,49)
    lastname: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(200)
    age: number;

    @IsOptional()
    @IsBoolean()
    isfree: boolean
    
}