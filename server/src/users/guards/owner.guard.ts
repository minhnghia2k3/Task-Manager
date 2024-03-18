import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user._id;
    const requestedUserId = request.params._id;

    return await this.validateUserOwner(userId, requestedUserId);
  }

  async validateUserOwner(userId: string, requestId: string): Promise<boolean> {
    const isExistUser = await this.usersService.findUserById(requestId);
    if (!isExistUser) {
      throw new UnauthorizedException('Not found requested user');
    }
    return userId === requestId;
  }
}
