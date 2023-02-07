import { Controller, Get } from '@nestjs/common';
import { RaceManager } from './services/race-manager.service';
import { Race } from './services/race.service';

@Controller('races')
export class RacesController {
  constructor(private raceManager: RaceManager) {}
  @Get()
  getRaces(): Race[] {
    return this.raceManager.getPublicRaces();
  }
}
