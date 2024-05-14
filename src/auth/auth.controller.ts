import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Roles } from 'src/common/enums/roles.enum';
import { UserRoles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/get')
  @UserRoles(Roles.MODERATOR)
  public async get() {
    return 'Nyek';
  }

  @Post('/signup')
  @UserRoles(Roles.MODERATOR)
  public async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post('/signin')
  public async login(@Body() verifyAuthDto: VerifyAuthDto) {
    return await this.authService.login(verifyAuthDto);
  }
}
