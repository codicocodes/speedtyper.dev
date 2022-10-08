import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { validateDTO } from 'src/utils/validateDTO';
import { GithubRepository } from '../dtos/github-repository.dto';
import { GithubTree } from '../dtos/github-tree.dto';

@Injectable()
export class GithubAPI {
  private static BASE_URL = 'https://api.github.com';
  private static REPOSITORIES_URL = `${GithubAPI.BASE_URL}/repos`;
  private static REPOSITORY_URL = `${GithubAPI.REPOSITORIES_URL}/{fullName}`;
  private static TREE_URL = `${GithubAPI.REPOSITORY_URL}/git/trees/{sha}?recursive=true`;
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
    const rawData = await this.get(url);
    const repository = await validateDTO(GithubRepository, rawData);
    return repository;
  }

  async fetchTree(fullName: string, sha: string): Promise<GithubTree> {
    const treeUrl = GithubAPI.TREE_URL.replace('{fullName}', fullName).replace(
      '{sha}',
      sha,
    );
    const rawData = await this.get(treeUrl);
    const rootNode = await validateDTO(GithubTree, rawData);
    return rootNode;
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
