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

  // TODO: can be a very large number of results in memory
  async getLeaderboard(): Promise<LeaderBoardResult[]> {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const resultsToday = await this.resultsRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.user', 'u')
      .where(
        `u.banned=false AND
        r.createdAt BETWEEN '${oneDayAgo.toISOString()}' AND '${new Date().toISOString()}'`,
      )
      .orderBy('r.cpm')
      .execute();
    return Object.values(
      Object.fromEntries(resultsToday.map((r: any) => [r.u_id, r])),
    )
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
