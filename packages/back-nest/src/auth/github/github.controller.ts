import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { RaceEvents } from 'src/races/services/race-events.service';
import { RaceManager } from 'src/races/services/race-manager.service';
import { User } from 'src/users/entities/user.entity';
import { GithubOauthGuard } from './github.guard';

@Controller('auth')
export class AuthController {
  constructor(private raceManager: RaceManager, private events: RaceEvents) {}
  @Delete()
  async logout(@Req() request: Request) {
    const prevUserId = request.session.user.id;
    const updatedUser = User.generateAnonymousUser();
    request.session.user = updatedUser;
    const raceId = request.session.raceId;
    if (raceId) {
      this.raceManager.syncUser(raceId, prevUserId, updatedUser);
      const race = this.raceManager.getRace(raceId);
      this.events.server.in(raceId).emit('race_joined', race);
    }
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
