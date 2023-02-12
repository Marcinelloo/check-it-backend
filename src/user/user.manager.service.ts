import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities/user/user.entity';
import { UserEntityService } from 'src/core/entities/user/user.entity.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

@Injectable()
export class UserManagerService {
  constructor(
    private readonly userService: UserService,
    private readonly userEntityService: UserEntityService,
  ) {}

  async createUser(user: User) {
    return await this.userEntityService.create(user);
  }

  async findUsers() {
    return await this.userEntityService.findUsers();
  }
  async findUserById(userId: string) {
    return await this.userEntityService.findById(userId);
  }
  async updateUser(userId: string, user: User) {
    const userFromDB = await this.userEntityService.findById(userId);

    if (user.password) {
      userFromDB.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    }

    userFromDB.name = user.name;
    userFromDB.surname = user.surname;
    userFromDB.username = user.username;
    userFromDB.role = user.role;
    userFromDB.can_login = user.can_login;

    return await userFromDB.save();
  }
}
