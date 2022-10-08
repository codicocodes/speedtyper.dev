import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';

@Injectable()
export class ChallengeService {
  private static UpsertOptions = {
    conflictPaths: ['content'],
    skipUpdateIfNoValuesChanged: true,
  };
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  async upsert(challenges: Challenge[]): Promise<void> {
    await this.challengeRepository.upsert(
      challenges,
      ChallengeService.UpsertOptions,
    );
  }
}
