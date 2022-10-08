import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { validateDTO } from 'src/utils/validateDTO';
import { GithubRepository } from '../dtos/github-repository.dto';

@Injectable()
export class GithubAPI {
  private static BASE_URL = 'https://api.github.com';
  private static REPOSITORY_URL = `${GithubAPI.BASE_URL}/repos/{fullName}`;
  private token: string;
  constructor(private readonly http: HttpService, cfg: ConfigService) {
    this.token = getGithubAccessToken(cfg);
  }

  private async get(url: string) {
    const resp = await firstValueFrom(
      this.http.get(url, {
        headers: {
          Authorization: `token ${this.token}`,
        },
      }),
    );
    return resp.data;
  }

  async fetchRepository(fullName: string): Promise<GithubRepository> {
    const url = GithubAPI.REPOSITORY_URL.replace('{fullName}', fullName);
    const rawRepository = await this.get(url);
    const repository = await validateDTO(GithubRepository, rawRepository);
    return repository;
  }
}

function getGithubAccessToken(cfg: ConfigService) {
  const token = cfg.get<string>('GITHUB_ACCESS_TOKEN');
  if (!token) {
    throw new Error(
      `GITHUB_ACCESS_TOKEN is missing from environment variables`,
    );
  }
  return token;
}
