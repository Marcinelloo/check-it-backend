import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { ROLE } from 'src/core/entities/user/user.entity';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(role: ROLE, userRole: ROLE) {
    return role === userRole;
  }

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<ROLE>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!request.user.can_login) return false;

    return user ? this.matchRoles(role, user.role) : false;
  }
}
