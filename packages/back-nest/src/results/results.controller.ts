import { Controller, Get } from '@nestjs/common';
import { LeaderBoardResult } from './entities/leaderboard-result.dto';
import { ResultService } from './services/results.service';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultService) {}
  @Get('leaderboard')
  getLeaderboard(): Promise<LeaderBoardResult[]> {
    return this.resultsService.getLeaderboard();
  }
}
