import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { AuthService } from 'src/auth/auth.service';
import { UserManagerService } from './user.manager.service';
import { UserEntityService } from 'src/core/entities/user/user.entity.service';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [UserController],
  providers: [UserService, AuthService, UserManagerService, UserEntityService],
})
export class UserModule {}
