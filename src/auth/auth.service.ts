import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE, User, UserDocument } from 'src/core/entities/user/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserEntityService } from 'src/core/entities/user/user.entity.service';
import { JwtPayload } from './interface/ jwt-payload.interface';
import { JwtPayloadRefresh } from './interface/jwt-payload-refresh-token';
import { LoginUserDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userEntityService: UserEntityService,
    private jwtService: JwtService,
  ) {}

  async refreshToken(token: string, refreshToken: string): Promise<any> {
    const { _id } = this.jwtService.decode(token) as JwtPayload;

    const user = await this.userEntityService.findById(_id);
    if (!user) throw new HttpException('Wrong token', HttpStatus.UNAUTHORIZED);
    const refreshPayload = (await this.jwtService.decode(
      refreshToken,
    )) as JwtPayloadRefresh;

    const isProper = await bcrypt.compare(token, refreshPayload.token);
    if (!isProper)
      throw new HttpException('Wrong refresh token', HttpStatus.UNAUTHORIZED);
    return this.createTokens(user);
  }

  async validateUser({ _id }: JwtPayload): Promise<User> {
    const user = await this.userEntityService.findById(_id);

    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userEntityService.findUserByPayload(loginUserDto);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    return this.createTokens(user);
  }

  async canAccess(token: string, role: ROLE) {
    const { _id } = this.jwtService.decode(token) as JwtPayload;
    if (!_id) return null;

    const user = await this.userEntityService.findById(_id);
    if (!user) return null;
    if (user.role === ROLE.ADMIN) return user;
    return user.role === role ? user : null;
  }

  private async createTokens(user: UserDocument) {
    const payload = {
      ...user,
    };

    const token = this.jwtService.sign(payload);

    const salt = await bcrypt.genSalt(10);

    const refreshPayload = {
      token: await bcrypt.hash(token, salt),
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: '2h',
    });

    return { refreshToken, token };
  }
}
