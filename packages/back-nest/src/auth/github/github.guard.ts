import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class GithubOauthGuard extends AuthGuard('github') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const request = context.switchToHttp().getRequest();
    const { next } = request.query;
    const queryParams = next
      ? {
          next,
        }
      : {};
    const state = new URLSearchParams(queryParams).toString();
    return {
      state,
      session: true,
    };
  }
}
