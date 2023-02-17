import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { PublicRace, RaceManager } from './services/race-manager.service';
import { Request } from 'express';

@Controller('races')
export class RacesController {
  constructor(private raceManager: RaceManager) {}
  @Get()
  getRaces(): PublicRace[] {
    return this.raceManager.getPublicRaces();
  }

  @Get('online')
  getOnlineCount(): { online: number } {
    const online = this.raceManager.getOnlineCount();
    return {
      online,
    };
  }

  @Post('online')
  toggleOnlineState(@Req() request: Request): { isPublic: boolean } {
    const userId = request.session.user.id;
    const raceId = request.session.raceId;
    const race = this.raceManager.getRace(raceId);
    if (race.owner !== userId) {
      throw new BadRequestException();
    }
    const isPublic = race.togglePublic();
    return {
      isPublic,
    };
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
