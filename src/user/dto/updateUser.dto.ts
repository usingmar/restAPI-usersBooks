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
    firstName: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1,49)
    lastName: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(200)
    age: number;

    @IsOptional()
    @IsBoolean()
    isFree: boolean
    
}