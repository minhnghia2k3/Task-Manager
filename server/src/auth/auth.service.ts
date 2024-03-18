import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersResponse } from 'src/users/dto/response/user-response.dto';

export type Payload = {
  _id: string;
  email: string;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Get `user` payload from previous guards,
   * issue an `access_token` then store in cookie, send to client with response header.
   * @param user
   * @param res
   */
  async generateToken(user: UsersResponse, res: Response) {
    const payload: Payload = { _id: user._id, email: user.email };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    // now + 3600ms * 1000 (1h)
    const expires = new Date(
      Date.now() + this.configService.get<number>('JWT_EXPIRES') * 1000,
    );

    res.cookie('Authentication', access_token, {
      expires,
      httpOnly: true,
    });
  }
}
