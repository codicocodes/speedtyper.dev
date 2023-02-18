import { Controller, Get } from '@nestjs/common';
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
}
