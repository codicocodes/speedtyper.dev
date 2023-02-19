import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getRandom(language?: string): Promise<Challenge> {
    let query = this.challengeRepository
      .createQueryBuilder('challenge')
      .leftJoinAndSelect('challenge.project', 'project');

    if (language) {
      query = query.where('project.language = :language', {
        language,
      });
    }

    const randomChallenge = await query.orderBy('RANDOM()').getOne();

    if (!randomChallenge)
      throw new BadRequestException(`No challenges for language: ${language}`);

    // TODO: fix this in the scraper/parsing layer
    randomChallenge.content = randomChallenge.content.replaceAll('\t', '  ');
    return randomChallenge;
  }
}
