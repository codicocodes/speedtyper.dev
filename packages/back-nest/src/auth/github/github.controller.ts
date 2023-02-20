import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { cookieName } from 'src/sessions/session.middleware';
import { User } from 'src/users/entities/user.entity';
import { GithubOauthGuard } from './github.guard';

@Controller('auth')
export class AuthController {
  @Delete()
  async logout(@Req() request: Request, @Res() response: Response) {
    await new Promise<void>((resolve, reject) =>
      request.session?.destroy((err) => {
        console.log('session destroyed', { err });
        if (err) {
          return reject(err);
        }
        return resolve();
      }),
    );
    response.clearCookie(cookieName);
    return response.send({
      ok: true,
    });
  }
}

@Controller('auth/github')
export class GithubAuthController {
  @Get()
  @UseGuards(GithubOauthGuard)
  async githubLogin() {
    // NOTE: the GithubOauthGuard initiates the authentication flow
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    request.session.user = request.user as User;
    const { state } = request.query;
    const params = new URLSearchParams(state as string);
    const next = params.get('next') ?? 'http://localhost:3001';
    response.redirect(next);
  }
}
