import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-github';
import { UserService } from 'src/users/services/user.service';
import { UpsertGithubUserDTO } from 'src/users/entities/upsertGithubUserDTO';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    cfg: ConfigService,
    private userService: UserService,
  ) {
    const BASE_URL =
      process.env.NODE_ENV === 'production'
        ? 'https://v3.speedtyper.dev'
        : 'http://localhost:1337';
    super({
      clientID: cfg.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: cfg.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: `${BASE_URL}/api/auth/github/callback`,
      scope: ['public_profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const upsertUserDTO = UpsertGithubUserDTO.fromGithubProfile(profile);
    const user = await this.userService.upsertGithubUser(
      upsertUserDTO.toUser(),
    );
    return user;
  }
}
