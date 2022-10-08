import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum GithubNodeType {
  blob = 'blob',
  tree = 'tree',
}

export class GithubNode {
  @IsString()
  path: string;
  @IsString()
  mode: string;
  @IsEnum(GithubNodeType)
  type: GithubNodeType;
  @IsString()
  sha: string;
  @IsNumber()
  size?: number;
  @IsString()
  url: string;
}

export class GithubTree {
  @IsString()
  sha: string;
  @IsString()
  url: string;
  tree: GithubNode[];
}
