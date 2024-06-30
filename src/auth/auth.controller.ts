import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Created.', type: User })
  @Post('/sign-up')
  @HttpCode(201)
  signUp(@Body() { username, password }: SignUpDto) {
    return this.authService.signUp(username, password);
  }

  @ApiResponse({ status: 200, description: 'OK.' })
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  login(@Req() req: Request, @Body() _: SignInDto) {
    return req.user;
  }
}