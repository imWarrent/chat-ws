import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt/jwt.strategy';
import { JwtGuard } from './jwt/jwt.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaClient, JWTStrategy, JwtGuard],
  exports: []
})
export class AuthModule {}
