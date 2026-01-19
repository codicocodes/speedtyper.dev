import { Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { RacePlayer } from 'src/races/services/race-player.service';
import { Race } from 'src/races/services/race.service';

@Injectable()
export class ResultCalculationService {
  getTimeMS(race: Race, player: RacePlayer): number {
    const firstTimeStampMS = race.startTime.getTime();
    const keyStrokes = player.validKeyStrokes();
    const lastTimeStampMS = keyStrokes[keyStrokes.length - 1].timestamp;
    return lastTimeStampMS - firstTimeStampMS;
  }

  getCPM(code: string, timeMS: number): number {
    if (timeMS <= 0) return 0;

    const timeSeconds = timeMS / 1000;
    const strippedCode = Challenge.getStrippedCode(code);

    if (strippedCode.length === 0) return 0;

    const cpm = (strippedCode.length / timeSeconds) * 60;
    const wpm = cpm / 5;

    if (wpm >= 300) {
      return 0;
    }

    return Math.floor(cpm);
  }

  getMistakesCount(player: RacePlayer): number {
    return player.incorrectKeyStrokes().length;
  }

  getAccuracy(player: RacePlayer): number {
    const incorrectKeyStrokes = player.incorrectKeyStrokes().length;
    const validKeyStrokes = player.validKeyStrokes().length;
    const totalKeySrokes = validKeyStrokes + incorrectKeyStrokes;
    return Math.floor((validKeyStrokes / totalKeySrokes) * 100);
  }
}
