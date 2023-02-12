import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LoginUserDto } from 'src/auth/dtos/login.dto';
import { User, UserDocument } from './user.entity';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<UserDocument>,
  ) {}

  async findById(_id: string | mongoose.Types.ObjectId) {
    return await this.userRepository.findById(_id);
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOne({ username });
  }

  async validatePassword(userPassword: string, comparePassword: string) {
    return await bcrypt.compare(comparePassword, userPassword);
  }

  async findUserByPayload(payload: LoginUserDto) {
    const user = await this.findUserByUsername(payload.username);

    if (user && this.validatePassword(user.password, payload.password)) {
      return user;
    }
    return null;
  }
}
