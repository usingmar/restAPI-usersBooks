import { HttpException } from "@nestjs/common";
import { CreateBookDTO } from "src/book/dto/createBook.dto";
import { UpdateBookDTO } from "src/book/dto/updateBook.dto";
import { CreateUserDTO } from "src/user/dto/createUser.dto";
import { UpdateUserDTO } from "src/user/dto/updateUser.dto";

type DTO = UpdateUserDTO | CreateUserDTO | CreateBookDTO | UpdateBookDTO

export const checkNumberOfProperties = (transferObject: DTO) => {
    if (Object.keys(transferObject).length == 0)
      throw new HttpException(
        {
          statusCode: '400',
          message: ['Empty JSON'],
          error: 'Bad request',
        },
        400,
      );
  };