import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';



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

  async login(loginUserDto: LoginUserDto): Promise<any> {

    const response = await this.userModel.findOne({ where: { no_kontrak: loginUserDto.no_kontrak } });
    // console.log(response)
    if (!response) {
      console.log("ini")
      throw new Error("Username not found");
    } else {
      if (response.password == loginUserDto.password) {
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
