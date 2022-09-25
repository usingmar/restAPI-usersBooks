import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsByteLength, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

@InputType('UpdateUserInput')
export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsByteLength(1, 49)
  @Field({ nullable: true })
  firstname?: string;

  @IsOptional()
  @IsString()
  @IsByteLength(1, 49)
  @Field({ nullable: true })
  lastname?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  @Field(type => Int, { nullable: true })
  age?: number;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isfree?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Field(type => [Int], { nullable: true })
  books?: number[];
}
