import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../entities/challenge.entity';
import { LanguageDTO } from '../entities/language.dto';

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
    let query = this.challengeRepository.createQueryBuilder('challenge');

    if (language) {
      query = query.where('language = :language', {
        language,
      });
    }

    const randomChallenge = await query.orderBy('RANDOM()').getOne();

    if (!randomChallenge)
      throw new BadRequestException(`No challenges for language: ${language}`);

    return randomChallenge;
  }

  async getLanguages(): Promise<LanguageDTO[]> {
    const selectedLanguages = await this.challengeRepository
      .createQueryBuilder()
      .select('language')
      .distinct()
      .execute();
    return selectedLanguages.map(({ language }: { language: string }) => ({
      language,
      name: this.getLanguageName(language),
    }));
  }

  private getLanguageName(language: string): string {
    const allLanguages = {
      js: 'JavaScript',
      ts: 'TypeScript',
      rs: 'Rust',
      c: 'C',
      java: 'Java',
      cpp: 'C++',
      go: 'Go',
      lua: 'Lua',
      php: 'PHP',
      py: 'Python',
      rb: 'Ruby',
      cs: 'C-Sharp',
    };
    return allLanguages[language];
  }
}
