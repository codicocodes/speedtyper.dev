import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import {
  AuthController,
  GithubAuthController,
} from './github/github.controller';
import { GithubStrategy } from './github/github.strategy';
import { UsersModule } from 'src/users/users.module';
import { RacesModule } from 'src/races/races.module';

@Module({
  imports: [
    PassportModule.register({
      // session: true,
    }),
    ConfigModule,
    UsersModule,
    RacesModule,
  ],
  controllers: [GithubAuthController, AuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
