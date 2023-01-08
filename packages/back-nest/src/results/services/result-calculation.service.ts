import { Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { RaceManager } from 'src/races/services/race-manager.service';

@Injectable()
export class ResultCalculationService {
  constructor(private raceManager: RaceManager) {}

  getTimeMS(raceId: string, userId: string): number {
    const player = this.raceManager.getPlayer(raceId, userId);
    const keyStrokes = player.validKeyStrokes();
    const firstTimeStampMS = keyStrokes[0].timestamp;
    const lastTimeStampMS = keyStrokes[keyStrokes.length - 1].timestamp;
    return lastTimeStampMS - firstTimeStampMS;
  }

  getCPM(raceId: string, timeMS: number): number {
    const timeSeconds = timeMS / 1000;
    const code = this.raceManager.getCode(raceId);
    const strippedCode = Challenge.getStrippedCode(code);
    const cps = strippedCode.length / timeSeconds;
    const cpm = cps * 60;
    return Math.floor(cpm);
  }
}
