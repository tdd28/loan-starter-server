import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import type { Profile, VerifyFunction } from 'passport-google-oauth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(
    private readonly prismaService: PrismaService
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    verify: VerifyFunction,
  ) {
    const user = await this.prismaService.oAuthCredential
      .upsert({
        where: {
          provider_uid: {
            provider: profile.provider,
            uid: profile.id,
          },
        },
        create: {
          provider: profile.provider,
          uid: profile.id,
          user: {
            create: {
              name: profile.displayName,
              email: profile.emails?.[0].value,
              avatarUrl: profile.emails?.[0].value,
            },
          },
        },
        update: {},
      })
      .user()

    verify(null, user);
  }
}
