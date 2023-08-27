import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    try {
      const { user } = context.switchToHttp().getRequest();

      if (user.userType !== 'Customer') {
        throw new ForbiddenException({
          status: 403,
          message: 'This process can be accessed by Customers only',
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
