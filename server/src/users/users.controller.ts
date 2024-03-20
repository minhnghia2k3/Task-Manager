import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateNewUserDto } from './dto/request/create-new-user.dto';
import { UsersResponse } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { OwnerGuard } from './guards/owner.guard';
import { UserIdDto } from './dto/request/user-id.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createNewUser(
    @Body() createNewUserDto: CreateNewUserDto,
  ): Promise<UsersResponse> {
    return await this.usersService.createUser(createNewUserDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User object id.',
  })
  async getUserById(@Param() { id }: UserIdDto): Promise<UsersResponse> {
    return await this.usersService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User object id.',
  })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() { id }: UserIdDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, OwnerGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User object id.',
  })
  async deleteUser(@Param() { id }: UserIdDto) {
    return this.usersService.softDeleteUser(id);
  }
}
