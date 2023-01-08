import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacesModule } from 'src/races/races.module';
import { ResultsController } from './controllers/results.controller';
import { Result } from './entities/result.entity';
import { ResultCalculationService } from './services/result-calculation.service';
import { ResultFactoryService } from './services/result-factory.service';
import { ResultService } from './services/results.service';
import { SaveResultRequestValidator } from './services/save-result-request-validator';

@Module({
  imports: [RacesModule, TypeOrmModule.forFeature([Result])],
  controllers: [ResultsController],
  providers: [
    SaveResultRequestValidator,
    ResultService,
    ResultFactoryService,
    ResultCalculationService,
  ],
})
export class ResultsModule {}
