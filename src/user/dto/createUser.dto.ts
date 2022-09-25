import { IsDefined } from '@nestjs/class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsByteLength, IsInt, IsString, Max, Min } from 'class-validator';

@InputType('CreateUserInput')
export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsByteLength(1, 49)
  @Field()
  firstname: string;

  @IsDefined()
  @IsString()
  @IsByteLength(1, 49)
  @Field()
  lastname: string;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(200)
  @Field(type => Int)
  age: number;

  @IsDefined()
  @IsBoolean()
  @Field()
  isfree: boolean;
}
