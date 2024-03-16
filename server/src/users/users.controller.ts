import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/request/get-user.dto';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';
import { UsersResponse } from './dto/response/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':userId')
  async getUserById(@Param() getUserDto: GetUserDto): Promise<UsersResponse> {
    return await this.usersService.findUserById(getUserDto.userId);
  }

  @Post()
  async createNewUser(
    @Body() createNewUserDto: CreateNewUserDto,
  ): Promise<UsersResponse> {
    return await this.usersService.createUser(createNewUserDto);
  }

  //   @Put(':userId')
  //   async updateUser(
  //     @Body() updateNewUserDto: UpdateNewUserDto,
  //     @Param() userId: string,
  //   ) {}

  //   @Delete(':userId')
  //   async deleteUser(@Param() userId: string) {}
}
