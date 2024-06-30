import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy, LocalStrategy } from './auth.strategy';
import { AuthController, OAuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, GoogleStrategy],
  controllers: [AuthController, OAuthController],
})
export class AuthModule {}
