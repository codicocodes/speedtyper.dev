import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubAPI } from './services/github-api';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GithubAPI],
  exports: [GithubAPI],
})
export class GithubConnectorModule {}
