import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GithubAuthController } from './github/github.controller';
import { GithubStrategy } from './github/github.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule.register({
      // session: true,
    }),
    ConfigModule,
    UsersModule,
  ],
  controllers: [GithubAuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
