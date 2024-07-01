import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard, OAuthGuard } from './auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RefreshTokenDto, SignInDto, SignUpDto } from './auth.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user';
import { AccessToken, OAuthProvider, Token } from './auth';
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
  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'OK.', type: Token })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: HttpException,
  })
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(200)
  signIn(@Req() req: Request) {
    return this.authService.signIn(req.user!);
  }


  @ApiResponse({ status: 200, description: 'OK.', type: AccessToken })
  @ApiResponse({ status: 400, description: 'Bad Request.', type: HttpException })
  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() { token }: RefreshTokenDto) {
    return this.authService.refresh(token)
  }
}

@ApiTags('oauth')
@Controller('oauth')
export class OAuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiParam({ name: 'provider', enum: OAuthProvider })
  @ApiQuery({
    name: 'callbackURL',
    type: String,
    required: false,
    description: 'Custom callback URL',
  })
  @ApiResponse({ status: 302, description: 'Redirect to Google Sign-In' })
  @UseGuards(OAuthGuard)
  @Get(':provider')
  oauth() {}

  @ApiParam({ name: 'provider', enum: OAuthProvider })
  @ApiResponse({ status: 200, description: 'OK.', type: Token })
  @UseGuards(OAuthGuard)
  @Get(':provider/callback')
  oauthCallback(@Req() req: Request) {
    return this.authService.signIn(req.user!);
  }
}
