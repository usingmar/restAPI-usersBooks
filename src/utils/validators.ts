import { HttpException } from "@nestjs/common";
import { UpdateUserDTO } from "src/user/dto/updateUser.dto";

type DTO = UpdateUserDTO

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