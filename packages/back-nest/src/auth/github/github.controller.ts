import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { GithubOauthGuard } from './github.guard';
import { GithubStrategy } from './github.strategy';

@Controller('auth/github')
export class GithubAuthController {
  constructor(private strategy: GithubStrategy) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubLogin(@Req() request: Request) {
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
    // TODO: update to env variable
    const next = params.get('next') ?? 'http://localhost:3001';
    console.log({ next });
    response.redirect(next);
  }
}
