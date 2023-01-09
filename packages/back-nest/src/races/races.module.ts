import { Module } from '@nestjs/common';
import { ChallengesModule } from 'src/challenges/challenges.module';
import { ResultsModule } from 'src/results/results.module';
import { RaceGateway } from './race.gateway';
import { AddKeyStrokeService } from './services/add-keystroke.service';
import { KeyStrokeValidationService } from './services/keystroke-validator.service';
import { ProgressService } from './services/progress.service';
import { RaceEvents } from './services/race-events.service';
import { RaceManager } from './services/race-manager.service';
import { ResultsHandlerService } from './services/results-handler.service';
import { SessionState } from './services/session-state.service';

@Module({
  imports: [ChallengesModule, ResultsModule],
  providers: [
    AddKeyStrokeService,
    KeyStrokeValidationService,
    ProgressService,
    RaceEvents,
    RaceGateway,
    RaceManager,
    ResultsHandlerService,
    SessionState,
  ],
  exports: [RaceManager, KeyStrokeValidationService],
})
export class RacesModule {}
