import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Result } from 'src/results/entities/result.entity';
import { ResultService } from 'src/results/services/results.service';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';

class StatsDTO {
  mistakeCount: number;
  typedCharsCount: number;
  combo: number;
  maxCombo: number;
  totalCpm: number;
  accuracy: number;
  trailingCpm: number;
}

class IncomingResultDTO {
  stats: StatsDTO;
  _id: string;
  userId: string;
  challengeId: string;
  time: string;
  totalSeconds: number;
  __createdAt: Date;
}

class IncomingUserDTO {
  username: string;
  githubId: number;
  githubUrl: string;
  avatarUrl: string;
  banned: boolean;
  _id: string;
  __createdAt: Date;
}
export function getExpectedToken() {
  const internalToken = process.env.INTERNAL_API_TOKEN;
  if (!internalToken) {
    throw new UnauthorizedException();
  }
  return internalToken;
}

export function parseProvidedToken(headers: IncomingHttpHeaders) {
  const token = headers['api-token'];
  if (!token) {
    throw new UnauthorizedException();
  }
  return token;
}

export function validateToken({ headers }: Request) {
  const token = parseProvidedToken(headers);
  const expectedToken = getExpectedToken();

  if (token !== expectedToken) {
    throw new UnauthorizedException();
  }
}

@Controller('internal')
export class InternalImportController {
  constructor(
    private userService: UserService,
    private resultsService: ResultService,
  ) {}
  @Post('results')
  async importResults(
    @Req() request: Request,
    @Body() results: IncomingResultDTO[],
  ): Promise<{ ok: boolean }> {
    validateToken(request);

    const batch = [];

    for (const legacyResult of results) {
      const user = await this.userService.findByLegacyID(legacyResult.userId);
      if (!user) throw new InternalServerErrorException();
      const result = new Result();
      result.user = user;
      result.createdAt = legacyResult.__createdAt;
      result.cpm = legacyResult.stats.totalCpm;
      result.accuracy = legacyResult.stats.accuracy;
      result.timeMS = legacyResult.totalSeconds * 1000;
      result.mistakes = legacyResult.stats.mistakeCount;
      result.legacyId = legacyResult._id;
      batch.push(result);
    }
    await this.resultsService.upsertByLegacyId(batch);
    return {
      ok: true,
    };
  }

  @Post('users')
  async importUsers(
    @Req() request: Request,
    @Body() users: IncomingUserDTO[],
  ): Promise<{ ok: boolean }> {
    validateToken(request);

    for (const legacyUser of users) {
      const user = new User();
      user.username = legacyUser.username;
      user.githubId = legacyUser.githubId;
      user.githubUrl = legacyUser.githubUrl;
      user.avatarUrl = legacyUser.avatarUrl;
      user.createdAt = legacyUser.__createdAt;
      user.banned = legacyUser.banned;
      user.legacyId = legacyUser._id;
      await this.userService.upsertGithubUser(user);
    }
    return {
      ok: true,
    };
  }
}
