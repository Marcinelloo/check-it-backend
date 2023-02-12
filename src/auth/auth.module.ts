import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CoreModule } from 'src/core/core.module';
import { UserEntityService } from 'src/core/entities/user/user.entity.service';
import { config } from '../../config';

@Module({
  imports: [
    CoreModule,
    PassportModule,
    JwtModule.register({
      secret: config.SECRET_KEY,
      signOptions: { expiresIn: '120h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserEntityService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
