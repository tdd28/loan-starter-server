import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() { username, password }: SignUpDto) {
    return this.authService.signUp(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  login(@Req() req: Request) {
    return req.user;
  }
}
