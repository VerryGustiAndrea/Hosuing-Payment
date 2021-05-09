import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  findAll(): Promise<User[]> {
    return this.userModel.findAll({ where: { role: 'warga' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async checkUsers(createUserDto: CreateUserDto) {
    return this.userModel.findOne({ where: { username: createUserDto.username } });
  }


  async register(createUserDto: CreateUserDto) {
    // //Hashing Password
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      name: createUserDto.name,
      username: createUserDto.username,
      password: hash,
      role: createUserDto.role
    })
    try {
      await createdUser.save()
      return createdUser
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const response = await this.userModel.findOne({ where: { username: loginUserDto.username } });
    if (!response) {
      throw new Error("Username not found");
    } else {
      //check password
      const isMatch = await bcrypt.compare(loginUserDto.password, response.password);
      if (isMatch) {
        return response
      } else {
        throw new Error("Password not match");
      }
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
