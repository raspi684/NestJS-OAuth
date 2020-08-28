import { Controller, Get, Param, NotFoundException, Post, Body, Put, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUpdateUser from './dto/CreateUpdateUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    // GET /users
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async index() {
        return this.usersService.findAll();
    }

    // GET /users/:id
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async show(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        if (user) return user;
        throw new NotFoundException('User not found');
    }

    // POST /users
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async store(@Body() data: CreateUpdateUser) {
        return await this.usersService.store(data);
    }

    // PUT /users/:id
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() data: CreateUpdateUser) {
        return await this.usersService.update(id, data);
    }

    // DELETE /users/:id
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    async destroy(@Param('id') id: string) {
        await this.usersService.destroy(id);
        return;
    }

}
