import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResultFactoryService } from '../services/result-factory.service';
import { ResultService } from '../services/results.service';
import { SaveResultRequestValidator } from '../services/save-result-request-validator';

@Controller('results')
export class ResultsController {
  constructor(
    private resultValidator: SaveResultRequestValidator,
    private resultFactory: ResultFactoryService,
    private resultService: ResultService,
  ) {}

  @Post()
  async saveResult(@Req() request: Request) {
    this.resultValidator.validate(request);
    const user = request.session.user;
    const raceId = request.session.raceId;
    const result = this.resultFactory.factory(raceId, user);
    const savedResult = await this.resultService.create(result);
    return savedResult;
  }
}
