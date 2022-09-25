import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { PutUserDTO } from "./dto/putUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { User_ } from "./user.entity";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController{
    constructor( private userService: UserService ){console.log('user controller constructor')}

    @Get()
    async getAll(): Promise<User_[]>{
        return await this.userService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<User_>{
        return await this.userService.findOne(id);
    }

    @Post()
    async create(@Body() DTO: CreateUserDTO): Promise<User_>{
        return await this.userService.create(DTO);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() DTO: PutUserDTO): Promise<User_>{
        return await this.userService.update(id, DTO);
    }

    @Patch(':id')
    async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() DTO: UpdateUserDTO): Promise<User_>{
        return await this.userService.update(id, DTO);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseIntPipe) id: number ): Promise<void>{
        await this.userService.delete(id);
    }
}