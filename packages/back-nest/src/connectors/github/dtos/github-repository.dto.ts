import { IsNumber, IsString } from "class-validator";

export class GithubLicense {
  @IsString()
  name: string;
}

export class GithubOwner {
  @IsString()
  login: string;
  @IsNumber()
  id: number;
  @IsString()
  avatar_url: string;
  @IsString()
  html_url: string;
}

export class GithubRepository {
  @IsNumber()
  id: number;
  @IsString()
  node_id: string;
  @IsString()
  name: string;
  @IsString()
  full_name: string;
  @IsString()
  html_url: string;
  @IsString()
  description: string;
  @IsString()
  url: string;
  @IsString()
  trees_url: string;
  @IsString()
  homepage: string;
  @IsNumber()
  stargazers_count: number;
  @IsString()
  language: string;
  @IsString()
  default_branch: string;
  license: GithubLicense;
  owner: GithubOwner;
}
