import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, ErrorResponse } from '../library';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('getlistwarga')
  async findAll() {
    const response = await this.userService.findAll();
    if (response.length) {
      return Response(response, 'Data ditemukan', true);
    } else {
      return Response(response, 'Data tidak ditemukan', false);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
