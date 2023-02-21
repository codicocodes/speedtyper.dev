import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaderBoardResult } from '../entities/leaderboard-result.dto';
import { Result } from '../entities/result.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
  ) {}

  async create(result: Result): Promise<Result> {
    return await this.resultsRepository.save(result);
  }

  async upsertByLegacyId(results: Result[]): Promise<void> {
    await this.resultsRepository.upsert(results, ['legacyId']);
  }

  async getLeaderboard(): Promise<LeaderBoardResult[]> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const resultsTodayStream = await this.resultsRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.user', 'u')
      .where(
        `u.banned=false AND
        r.createdAt BETWEEN '${oneDayAgo.toISOString()}' AND '${new Date().toISOString()}'`,
      )
      .orderBy('r.cpm')
      .stream();

    const resultsToday: Record<string, any> = {};

    for await (const r of resultsTodayStream) {
      if (!resultsToday[r.u_id]) {
        resultsToday[r.u_id] = r;
        continue;
      }
      const prevResult = resultsToday[r.u_id];
      if (r.r_cpm > prevResult.r_cpm) {
        resultsToday[r.u_id] = r;
      }
    }
    return Object.values(resultsToday)
      .map((r) => {
        return {
          username: r.u_username,
          avatarUrl: r.u_avatarUrl,
          cpm: r.r_cpm,
          accuracy: r.r_accuracy,
          createdAt: r.r_createdAt,
        };
      })
      .reverse();
  }
}
