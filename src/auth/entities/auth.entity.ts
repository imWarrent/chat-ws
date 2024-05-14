import { ApiProperty } from '@nestjs/swagger';
import { DefaultFields } from 'src/common/dto/Default';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Roles } from 'src/common/enums/roles.enum';
import { AccountStatus } from '../enums/status.enum';
export class Auth extends DefaultFields {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  hashed: string;

  @ApiProperty({
    isArray: true,
    enum: Roles
  })
  @IsString()
  @IsEnum(Roles)
  @IsArray()
  roles: Roles[];
}
