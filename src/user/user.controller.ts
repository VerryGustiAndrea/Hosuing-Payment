import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, ErrorResponse, ErrorResponseCustom } from '../library';

const bcrypt = require("bcrypt");
const saltRounds = 10;

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

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const check = await this.userService.checkUsers(createUserDto);
      if (check) {
        return ErrorResponseCustom('Username tidak tersedia', false, null)
      } else {
        const response = await this.userService.register(createUserDto);
        return Response(response, 'Success Add User', true);
      }
    } catch (error) {
      return ErrorResponse(error, 500, null)
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const response = await this.userService.login(loginUserDto);
      return Response(response, 'Data ditemukan', true);
    } catch (error) {
      return ErrorResponseCustom('No Kontrak atau Password salah ', false, null)
    }
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
