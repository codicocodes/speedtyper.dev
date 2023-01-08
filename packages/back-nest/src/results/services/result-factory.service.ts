import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Result } from '../entities/result.entity';
import { ResultCalculationService } from './result-calculation.service';

@Injectable()
export class ResultFactoryService {
  constructor(private resultCalculation: ResultCalculationService) {}
  factory(raceId: string, user: User): Result {
    const result = new Result();
    const timeMS = this.resultCalculation.getTimeMS(raceId, user.id);
    const cpm = this.resultCalculation.getCPM(raceId, timeMS);
    result.raceId = raceId;
    result.user = user;
    result.timeMS = timeMS;
    result.cpm = cpm;
    return result;
  }
}
