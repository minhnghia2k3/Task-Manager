import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

/**
 * OwnerGuard check if user has permissions for modify source.
 * @returns false - if `requestId` is not `userId` from access_token
 * @returns true - if `requestId` equal `userId`
 */
@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user._id;
    const requestedUserId = request.params.id;

    return await this.validateUserOwner(userId, requestedUserId);
  }

  async validateUserOwner(userId: string, requestId: string): Promise<boolean> {
    return userId === requestId;
  }
}
