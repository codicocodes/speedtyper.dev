import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GithubOauthGuard extends AuthGuard('github') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      state: this.getState(request),
      session: true,
    };
  }

  getState(request: Request) {
    const { next } = request.query as Record<string, string>;
    const queryParams = next
      ? {
          next,
        }
      : {};
    const state = new URLSearchParams(queryParams).toString();
    return state;
  }
}
