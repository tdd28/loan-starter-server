import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User) {
    return {
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }

  async signUp(username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.prismaService.user.create({
      data: {
        authStrategies: {
          create: {
            strategy: 'local',
            id: username,
            secret: hashedPassword,
          },
        },
      },
    });
  }

  async findUserByLocalStrategy(username: string, password: string) {
    const authStrategy =
      await this.prismaService.authStrategy.findUniqueOrThrow({
        include: {
          user: true,
        },
        where: {
          strategy_id: {
            strategy: 'local',
            id: username,
          },
        },
      });

    if (!(await bcrypt.compare(password, authStrategy.secret!)))
      throw new BadRequestException('Invalid username or password');

    return authStrategy.user;
  }
}
