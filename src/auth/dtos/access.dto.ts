import { IsNotEmpty } from 'class-validator';
import { ROLE } from 'src/core/entities/user/user.entity';

export class CanAccessDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  role: ROLE;
}
