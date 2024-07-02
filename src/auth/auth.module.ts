import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleStrategy, JwtStrategy, LocalStrategy } from './auth.strategy';
import { AuthController, OAuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy],
  controllers: [AuthController, OAuthController],
})
export class AuthModule {}
