import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { error } from 'console';
import * as request from 'supertest';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const bearerToken = context.switchToHttp().getRequest().request
      .headers.authorization;
    try {
      const decoded = this.jwtService.verify(bearerToken, {
        secret: process.env.JWT_SECRET
      }) as any;
      console.log('ds');
      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch (ex) {
      const client = context.switchToWs().getClient();
      client.disconnect({ reason: 'Invalid authorization header' });
      throw new WsException({ error: 'Unauthorized' });
    }
  }
}
