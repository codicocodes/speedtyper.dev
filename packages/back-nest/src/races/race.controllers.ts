import { Controller, Get } from '@nestjs/common';
import { PublicRace, RaceManager } from './services/race-manager.service';

@Controller('races')
export class RacesController {
  constructor(private raceManager: RaceManager) {}
  @Get()
  getRaces(): PublicRace[] {
    return this.raceManager.getPublicRaces();
  }
}
