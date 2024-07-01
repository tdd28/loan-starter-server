import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpDto } from './auth.dto';
import { Profile } from 'passport';

@Injectable()
export class AuthService {
  private refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User) {
    return {
      accessToken: this.generateAccessToken(user.id),
      refreshToken: this.generateRefreshToken(user.id)
    };
  }

  async signUp({ name, email, password }: SignUpDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.prismaService.user.create({
      data: {
        email,
        name,
        authStrategies: {
          create: {
            strategy: 'local',
            id: email,
            secret: hashedPassword,
          },
        },
      },
    });
  }

  refresh(token: string) {
    try {    
      const { sub } = this.jwtService.verify(token, { secret: this.refreshTokenSecret })
  
      return {
        accessToken: this.generateAccessToken(+sub)
      }
    } catch (error) {
      throw new BadRequestException(error)    
    }
  }

  async findUserByLocalStrategy(email: string, password: string) {
    const authStrategy =
      await this.prismaService.authStrategy.findUniqueOrThrow({
        include: {
          user: true,
        },
        where: {
          strategy_id: {
            strategy: 'local',
            id: email,
          },
        },
      });

    if (!(await bcrypt.compare(password, authStrategy.secret!)))
      throw new BadRequestException('Invalid email or password');

    return authStrategy.user;
  }

  findOrCreateUserByProfile(profile: Profile) {
    return this.prismaService.authStrategy
      .upsert({
        where: {
          strategy_id: {
            strategy: profile.provider,
            id: profile.id,
          },
        },
        create: {
          strategy: profile.provider,
          id: profile.id,
          user: {
            create: {
              name: profile.displayName,
              email: profile.emails?.[0].value,
              photo: profile.photos?.[0].value,
            },
          },
        },
        update: {},
      })
      .user();
  }

  private generateAccessToken(userId: number) {
    return this.jwtService.sign({ sub: userId })
  }

  private generateRefreshToken(userId: number) {
    return this.jwtService.sign({ sub: userId }, {
      expiresIn: '90d',
      secret: this.refreshTokenSecret,
    })
  }
}
