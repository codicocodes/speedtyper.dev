import { Command, CommandRunner } from 'nest-commander';
import { Result } from 'src/results/entities/result.entity';
import { ResultService } from 'src/results/services/results.service';
import { UserService } from 'src/users/services/user.service';
import { INTERNAL_RESULTS_STREAM_API, streamLegacyData } from '../api';

@Command({
  name: 'import-legacy-results',
  arguments: '',
  options: {},
})
export class ImportLegacyResultsRunner extends CommandRunner {
  constructor(
    private resultService: ResultService,
    private userService: UserService,
  ) {
    super();
  }
  async run(): Promise<void> {
    const saveLegacyResult = async (legacyResults: any[]) => {
      const results = [];
      for (const legacyResult of legacyResults) {
        const user = await this.userService.findByLegacyID(
          legacyResult.user_id,
        );
        const result = new Result();
        result.user = user;
        result.createdAt = legacyResult.__createdAt;
        result.cpm = legacyResult.stats.totalCpm;
        result.accuracy = legacyResult.stats.accuracy;
        result.timeMS = legacyResult.totalSeconds * 1000;
        result.mistakes = legacyResult.stats.mistakeCount;
        result.legacyId = legacyResult._id;
        results.push(result);
      }
      await this.resultService.upsertByLegacyId(results);
    };
    await streamLegacyData(INTERNAL_RESULTS_STREAM_API, saveLegacyResult);
  }
}
