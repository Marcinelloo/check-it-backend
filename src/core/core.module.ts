import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user/user.entity';
import { UserEntityService } from './entities/user/user.entity.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => UserSchema,
        collection: 'user',
      },
    ]),
  ],
  controllers: [],
  providers: [UserEntityService],
  exports: [MongooseModule, UserEntityService],
})
export class CoreModule {}
