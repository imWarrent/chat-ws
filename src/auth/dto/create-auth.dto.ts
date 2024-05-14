import { PickType } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';
export class CreateAuthDto extends PickType(Auth, [
  'username',
  'hashed',
  'roles'
]) {}
