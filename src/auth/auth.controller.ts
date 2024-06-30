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
import { User } from '../user/user';
import { Token } from './auth';
import { HttpException } from '../common/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'Created.', type: User })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: HttpException,
  })
  @Post('/sign-up')
  @HttpCode(201)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiResponse({ status: 200, description: 'OK.', type: Token })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: HttpException,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(200)
  signIn(@Req() req: Request, @Body() _: SignInDto) {
    return this.authService.signIn(req.user!);
  }
}
