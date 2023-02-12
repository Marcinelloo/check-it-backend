import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/core/entities/user/user.entity';

export const Access = (role: ROLE) => SetMetadata('role', role);
