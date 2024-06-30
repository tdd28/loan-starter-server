import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
