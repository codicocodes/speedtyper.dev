import { Module } from '@nestjs/common';
import { ChallengesModule } from 'src/challenges/challenges.module';
import { ResultsModule } from 'src/results/results.module';
import { RaceGateway } from './race.gateway';
import { KeyStrokeValidationService } from './services/keystroke-validator.service';
import { ProgressService } from './services/progress.service';
import { RaceEvents } from './services/race-events.service';
import { RaceManager } from './services/race-manager.service';
import { SessionState } from './services/session-state.service';

@Module({
  imports: [ChallengesModule, ResultsModule],
  providers: [
    RaceEvents,
    SessionState,
    RaceManager,
    RaceGateway,
    KeyStrokeValidationService,
    ProgressService,
  ],
  exports: [RaceManager, KeyStrokeValidationService],
})
export class RacesModule {}
