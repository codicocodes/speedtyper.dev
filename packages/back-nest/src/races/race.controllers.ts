import { Controller, Get, Param, Req } from '@nestjs/common';
import { PublicRace, RaceManager } from './services/race-manager.service';
import { Request } from 'express';

@Controller('races')
export class RacesController {
  constructor(private raceManager: RaceManager) {}
  @Get()
  getRaces(): PublicRace[] {
    return this.raceManager.getPublicRaces();
  }

  @Get(':raceId/status')
  getRaceStatus(
    @Req() request: Request,
    @Param('raceId') raceId: string,
  ): { ok: boolean } {
    try {
      const userId = request.session.user.id;
      const player = this.raceManager.getPlayer(raceId, userId);
      return { ok: !!player };
    } catch (err) {
      return { ok: false };
    }
  }
}
