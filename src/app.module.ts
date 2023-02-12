import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { config } from '../config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, MongooseModule.forRoot(config.MONGO_URL), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
