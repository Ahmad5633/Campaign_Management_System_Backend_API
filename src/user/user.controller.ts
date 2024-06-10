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

    

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('email/:email')
    async findUserByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.findUserByEmail(email);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }
    
}