import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import * as argon2 from 'argon2';
import { VerifyAuthDto } from './dto/verify-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private prismaClient: PrismaClient,
    private jwtService: JwtService
  ) {}
  public async create(createAuthDto: CreateAuthDto) {
    try {
      const hash = await argon2.hash(createAuthDto.hashed);

      return await this.prismaClient.userAccount.create({
        data: { ...createAuthDto, hashed: hash }
      });
    } catch (err) {
      console.log(err);
    }
  }

  public async login(verifyAuthDto: VerifyAuthDto) {
    try {
      const findUser = await this.prismaClient.userAccount.findFirst({
        where: {
          username: verifyAuthDto.username,
          isDeleted: false
        }
      });

      if (findUser) {
        if (await argon2.verify(findUser.hashed, verifyAuthDto.password)) {
          const payload = {
            sub: findUser.uuid,
            userName: findUser.username,
            roles: findUser.roles
          };
          return {
            access_token: await this.jwtService.signAsync(payload, {
              secret: process.env.JWT_SECRET
            }),
            payload
          };
        }
      }
      return new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    } catch (err) {
      console.log(err);
    }
  }
}
