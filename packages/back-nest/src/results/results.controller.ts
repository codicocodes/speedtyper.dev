import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request } from 'express';
import { LeaderBoardResult } from './entities/leaderboard-result.dto';
import { ResultService } from './services/results.service';

@Controller('results')
export class ResultsController {
  leaderboardP?: Promise<LeaderBoardResult[]>;
  constructor(private resultsService: ResultService) {}
  @Get('leaderboard')
  async getLeaderboard(): Promise<LeaderBoardResult[]> {
    if (this.leaderboardP) {
      // there is an ongoing promise
      return this.leaderboardP;
    }
    // cache the leaderboard promise so we only hit the DB once per concurrent request
    this.leaderboardP = this.resultsService.getLeaderboard();
    return this.leaderboardP.finally(() => {
      // reset the promise so new clients don't get a stale leaderboard
      this.leaderboardP = undefined;
    });
  }
  @Get('/stats')
  async getStatsByUser(@Req() request: Request) {
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const startOfTime = new Date('January 1, 1979');
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setUTCHours(0, 0, 0, 0);

    const user = request.session.user;
    const [cpmAllTime, cpmToday, cpmLastWeek, cpmLast10] = await Promise.all([
      this.resultsService.getAverageCPMSince(user.id, startOfTime),
      this.resultsService.getAverageCPMSince(user.id, startOfToday),
      this.resultsService.getAverageCPMSince(user.id, oneWeekAgo),
      this.resultsService.getAverageCPM(user.id, 10),
    ]);
    return {
      cpmLast10,
      cpmToday,
      cpmLastWeek,
      cpmAllTime,
    };
  }

  @Get(':resultId')
  getRaceStatus(@Param('resultId') resultId: string) {
    if (!isUUID(resultId)) throw new BadRequestException('Invalid resultId');
    const result = this.resultsService.getByID(resultId);
    return result;
  }
}
