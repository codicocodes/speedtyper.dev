import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum GithubBlobEncoding {
  base64 = 'base64',
}

export class GithubBlob {
  @IsString()
  sha: string;
  @IsString()
  node_id: string;
  @IsNumber()
  size: number;
  @IsString()
  url: string;
  @IsString()
  content: string;
  @IsEnum(GithubBlobEncoding)
  encoding: 'base64';
}
