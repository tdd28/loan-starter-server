import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/auth.decorator';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
