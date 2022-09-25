import { IsArray, IsByteLength, IsDefined, IsInt, IsString } from 'class-validator';

export class PutBookDTO {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  @IsByteLength(1, 49)
  author: string;

  @IsDefined()
  @IsArray()
  @IsInt({ each: true })
  users: number[];
}
