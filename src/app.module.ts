import { Module } from '@nestjs/common';
import { GatewayModule } from './chat/gateway.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GatewayModule, AuthModule]
})
export class AppModule {}
