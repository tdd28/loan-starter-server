import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import type { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':strategy')
  @UseGuards(AuthGuard)
  async authenticate() {}

  @Get(':strategy/callback')
  @UseGuards(AuthGuard)
  login(@Req() req: Request) {
    return this.authService.login(req.user!);
  }
}
