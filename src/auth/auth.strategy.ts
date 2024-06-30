import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy as PassportLocalStrategy,
  VerifyFunction as PassportLocalVerifyFunction,
} from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate: PassportLocalVerifyFunction = async (username, password) => {
    return await this.authService.findUserByLocalStrategy(username, password);
  };
}
