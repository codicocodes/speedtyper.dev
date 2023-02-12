import { Injectable } from '@nestjs/common';
import { RacePlayer } from 'src/races/services/race-player.service';
import { Race } from 'src/races/services/race.service';
import { User } from 'src/users/entities/user.entity';
import { Result } from '../entities/result.entity';
import { ResultCalculationService } from './result-calculation.service';

@Injectable()
export class ResultFactoryService {
  constructor(private resultCalculation: ResultCalculationService) {}
  factory(race: Race, player: RacePlayer, user: User): Result {
    const challenge = race.challenge;
    const result = new Result();
    const timeMS = this.resultCalculation.getTimeMS(race, player);
    const cpm = this.resultCalculation.getCPM(challenge.content, timeMS);
    const mistakes = this.resultCalculation.getMistakesCount(player);
    const accuracy = this.resultCalculation.getAccuracy(player);
    result.raceId = player.raceId;
    result.user = user;
    result.challenge = challenge;
    result.timeMS = timeMS;
    result.cpm = cpm;
    result.mistakes = mistakes;
    result.accuracy = accuracy;
    return result;
  }
}
