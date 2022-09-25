import { IsArray, IsByteLength, IsInt, IsOptional, IsString } from 'class-validator';

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
    @IsInt({each: true})
    users: number[]
}