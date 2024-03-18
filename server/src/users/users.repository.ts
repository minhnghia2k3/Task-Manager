import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';

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

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return await this.usersModel.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true },
    );
  }

  async deleteUser(userId: string): Promise<Users> {
    console.log('userId: ', userId);
    return this.usersModel.findByIdAndUpdate(
      userId,
      { isActive: 0 },
      { new: true },
    );
  }

  async findUserByEmail(email: string): Promise<Users> {
    return await this.usersModel.findOne({ email: email });
  }
}
