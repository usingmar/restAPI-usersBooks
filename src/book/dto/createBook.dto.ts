import { Field, InputType } from '@nestjs/graphql';
import { IsByteLength, IsDefined, IsString } from 'class-validator';

@InputType('CreateBookInput')
export class CreateBookDTO {
  @IsDefined()
  @IsString()
  @Field()
  title: string;

  @IsDefined()
  @IsString()
  @IsByteLength(1, 49)
  @Field()
  author: string;
}
