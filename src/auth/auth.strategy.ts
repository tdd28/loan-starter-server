import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy as PassportLocalStrategy,
  VerifyFunction as PassportLocalVerifyFunction,
} from 'passport-local';
import {
  OAuth2Strategy as PassportGoogleStrategy,
  Profile as PassportGoogleProfile,
} from 'passport-google-oauth';
import { AuthService } from './auth.service';
import {
  Strategy as PassportJwtStrategy,
  ExtractJwt,
  VerifyCallback as PassportJwtVerifyCallback,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  validate: PassportJwtVerifyCallback = (payload) => {
    return this.authService.findUserByJwtPayload(payload);
  };
}

@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  validate: PassportLocalVerifyFunction = async (email, password) => {
    return await this.authService.findUserByLocalStrategy(email, password);
  };
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(PassportGoogleStrategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: PassportGoogleProfile,
  ) {
    return this.authService.findOrCreateUserByProfile(profile);
  }
}
