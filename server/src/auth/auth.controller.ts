import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './auth.decorator';
import { UsersResponse } from 'src/users/dto/response/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UsersResponse,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.generateToken(user, response);
    return user;
  }
}
