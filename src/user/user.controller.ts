import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-role.guard';
import { ROLE, User } from 'src/core/entities/user/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { UserManagerService } from './user.manager.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userManagerService: UserManagerService,
  ) {}

  @Post()
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }

  @JwtAccessGuard(ROLE.ADMIN)
  @Post()
  async createUser(@Body() body: User) {
    return await this.userManagerService.createUser(body);
  }

  @JwtAccessGuard(ROLE.ADMIN)
  @Get()
  async findUsers() {
    return await this.userManagerService.findUsers();
  }

  @JwtAccessGuard(ROLE.ADMIN)
  @Get(':id')
  async findUser(@Param('id') userId: string) {
    return await this.userManagerService.findUserById(userId);
  }

  @JwtAccessGuard(ROLE.ADMIN)
  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() body: User) {
    return await this.userManagerService.updateUser(userId, body);
  }
}
