import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './schemas/users.schema';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersResponse } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
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
      tasks: user.tasks,
    };
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
   * Contain 2 params are `userId` for filter, and `updateUserDto` for update data.
   * If no user was found. Throw Not Found error.
   * Return UsersResponse
   * @param userId
   * @param updateUserDto
   * @returns UsersResponse
   */
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersResponse> {
    const updatedUser = await this.usersRepository.updateUser(
      userId,
      updateUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found by id.');
    }
    return this.builtResponse(updatedUser);
  }

  /**
   * Find user by `userId` and update `isActive` field to 0 ( Deactivate )
   * @param userId
   * @return UsersResponse
   */
  async softDeleteUser(userId: string): Promise<UsersResponse> {
    const deletedUser = await this.usersRepository.deleteUser(userId);
    console.log('deletedUser: ', deletedUser);
    if (!deletedUser) {
      throw new NotFoundException('User not found by id.');
    }
    return this.builtResponse(deletedUser);
  }

  /**
   * Validate input `email` and `password`
   * @param email
   * @param password
   * @returns UsersResponse
   */
  async validateUser(email: string, password: string): Promise<UsersResponse> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.builtResponse(user);
  }
}
