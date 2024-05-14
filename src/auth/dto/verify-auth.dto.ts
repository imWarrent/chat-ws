import { ApiProperty, PickType } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';
import { IsString } from 'class-validator';
export class VerifyAuthDto extends PickType(Auth, ['username']) {
  @ApiProperty()
  @IsString()
  password: string;
}
