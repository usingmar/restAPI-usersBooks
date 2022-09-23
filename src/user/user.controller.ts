import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { User_ } from "./user.entity";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController{
    constructor( private userService: UserService ){}

    @Get()
    async getAll(): Promise<User_[]>{
        return await this.userService.findAll();
    }

    @Get(':id')
    async getOne(@Param() { id }): Promise<User_>{
        return await this.userService.findOne(id);
    }

    @Post()
    async create(@Body() DTO: CreateUserDTO): Promise<User_>{
        return await this.userService.create(DTO);
    }

    @Put(':id')
    async update(@Param() { id },@Body() DTO: CreateUserDTO): Promise<User_>{
        return await this.userService.update(id, DTO);
    }

    @Patch(':id')
    async updatePartial(@Param() { id }, @Body() DTO: UpdateUserDTO): Promise<User_>{
        return await this.userService.update(id, DTO);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param() { id }): Promise<void>{
        await this.userService.delete(id);
    }
}