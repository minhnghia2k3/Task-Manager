import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './schemas/users.schema';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersResponse } from './dto/response/user-response.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Format the response data, remove `password` field.
   * @param user
   * @returns UsersResponse
   */
  private builtResponse(user: Users): UsersResponse {
    return {
      _id: user._id.toHexString(),
      email: user.email,
      isActive: user.isActive,
      avatar: user.avatar,
      task: user.tasks,
    };
  }

  /**
   * Take in userId as string, then find user in database.
   * @param userId
   * @returns Users
   */
  async findUserById(userId: string): Promise<UsersResponse> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Not found user by Id');
    }
    return this.builtResponse(user);
  }

  /**
   * Register new user, take in { email, password }
   * @param createNewUserDto
   * @returns Users
   */
  async createUser(createNewUserDto: CreateNewUserDto): Promise<UsersResponse> {
    await this.validateCreateUser(createNewUserDto.email);
    const hashPassword = await bcrypt.hash(createNewUserDto.password, 10);

    const newUser = await this.usersRepository.createUser({
      ...createNewUserDto,
      password: hashPassword,
    });

    return this.builtResponse(newUser);
  }

  /**
   * Check user email is exist in database or not.
   * @param email
   */
  private async validateCreateUser(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (user) {
      throw new ConflictException('Email is already registered.');
    }
  }
}
