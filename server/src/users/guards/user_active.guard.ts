import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersResponse } from '../dto/response/user-response.dto';

/**
 * UserActiveGuard handle user is allow to access API?
 * @return true if isActive = true
 * @return false if isActive = false
 */
@Injectable()
export class UserActiveGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UsersResponse = request.user;

    if (!user.isActive) {
      throw new ForbiddenException(
        'User has been banned! Contact Administrator.',
      );
    }

    return user.isActive;
  }
}
