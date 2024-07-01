import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export enum OAuthProvider {
  Google = 'google',
}

export class AccessToken {
  @ApiProperty()
  accessToken: string; 
}