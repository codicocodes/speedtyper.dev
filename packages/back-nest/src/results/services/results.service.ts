import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../entities/result.entity';
import { ResultCalculationService } from './result-calculation.service';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
  ) {}

  async create(result: Result): Promise<Result> {
    return await this.resultsRepository.save(result);
  }
}
