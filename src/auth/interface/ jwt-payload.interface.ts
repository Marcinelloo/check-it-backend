import { UserDocument } from 'src/core/entities/user/user.entity';
import { User } from 'src/user/entities/user.entity';

export interface JwtPayload extends UserDocument {}
