import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}
  async findUserById(userId: string): Promise<Users> {
    return await this.usersModel.findById(userId);
  }

  async createUser(createNewUserDto: CreateNewUserDto): Promise<Users> {
    return await this.usersModel.create(createNewUserDto);
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.usersModel.findOne({ email: email });
  }
}
