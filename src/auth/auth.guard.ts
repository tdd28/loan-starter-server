import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      params: { strategy },
      query: { callbackURL },
    } = context.switchToHttp().getRequest<Request>();
    const Guard = PassportAuthGuard(strategy);
    return new Guard({ callbackURL }).canActivate(context);
  }
}
