import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    async createUser(@Body() user: User ): Promise<User> {
        return this.userService.createUser(user);
    }   
}