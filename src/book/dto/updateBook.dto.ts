import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsByteLength, IsInt, IsOptional, IsString } from 'class-validator';

@InputType('UpdateBookInput')
export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @IsByteLength(1, 49)
  @Field({ nullable: true })
  author?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Field(type => [Int], { nullable: true })
  users: number[];
}
