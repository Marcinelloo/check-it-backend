import { SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ROLE } from 'src/core/entities/user/user.entity';
import { Access } from '../decorators/role.decorator';
import { AccessGuard } from './access.guard';
import { JwtGuard } from './jwt-authentication.guard';

export const JwtAccessGuard = (role: ROLE): any => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<unknown>,
  ): void | TypedPropertyDescriptor<unknown> => {
    Access(role)(target, propertyKey, descriptor);
    UseGuards(JwtGuard, AccessGuard)(target, propertyKey, descriptor);
  };
};
