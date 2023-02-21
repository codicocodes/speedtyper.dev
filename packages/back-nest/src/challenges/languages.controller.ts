import { Controller, Get } from '@nestjs/common';
import { LanguageDTO } from './entities/language.dto';
import { ChallengeService } from './services/challenge.service';

@Controller('languages')
export class LanguageController {
  constructor(private service: ChallengeService) {}
  @Get()
  getLeaderboard(): Promise<LanguageDTO[]> {
    return this.service.getLanguages();
  }
}
