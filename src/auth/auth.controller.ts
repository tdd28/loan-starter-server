import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get(':strategy')
  @UseGuards(AuthGuard)
  async authenticate() {}

  @Get(':strategy/callback')
  @UseGuards(AuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }
}
