import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/request/get-user.dto';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';
import { UsersResponse } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { OwnerGuard } from './guards/owner.guard';
import { Request } from 'express';
import { UserIdDto } from './dto/request/user-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createNewUser(
    @Body() createNewUserDto: CreateNewUserDto,
  ): Promise<UsersResponse> {
    return await this.usersService.createUser(createNewUserDto);
  }

  @Get(':userId')
  async getUserById(@Param() getUserDto: GetUserDto): Promise<UsersResponse> {
    return await this.usersService.findUserById(getUserDto.userId);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Put(':_id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() params: UserIdDto,
  ) {
    return this.usersService.updateUser(params._id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Delete(':_id')
  async deleteUser(@Param() params: UserIdDto) {
    return this.usersService.softDeleteUser(params._id);
  }
}
