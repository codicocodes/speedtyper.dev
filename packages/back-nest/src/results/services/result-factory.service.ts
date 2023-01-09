import { Injectable } from '@nestjs/common';
import { RacePlayer } from 'src/races/services/race-player.service';
import { User } from 'src/users/entities/user.entity';
import { Result } from '../entities/result.entity';
import { ResultCalculationService } from './result-calculation.service';

@Injectable()
export class ResultFactoryService {
  constructor(private resultCalculation: ResultCalculationService) {}
  factory(code: string, player: RacePlayer): Result {
    const result = new Result();
    const timeMS = this.resultCalculation.getTimeMS(player);
    const cpm = this.resultCalculation.getCPM(code, timeMS);
    const mistakes = this.resultCalculation.getMistakesCount(player);
    const accuracy = this.resultCalculation.getAccuracy(player);
    result.raceId = player.raceId;
    result.user = { id: player.id } as User;
    result.timeMS = timeMS;
    result.cpm = cpm;
    result.mistakes = mistakes;
    result.accuracy = accuracy;
    return result;
  }
}
