import { Controller, Get, Req } from '@nestjs/common';
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
    const user = request.session.user;
    const [cpmToday, cpmLast3, cpmLast10] = await Promise.all([
      this.resultsService.getAverageCPMToday(user.id),
      this.resultsService.getAverageCPM(user.id, 3),
      this.resultsService.getAverageCPM(user.id, 10),
    ]);
    return {
      cpmToday,
      cpmLast3,
      cpmLast10,
    };
  }
}
