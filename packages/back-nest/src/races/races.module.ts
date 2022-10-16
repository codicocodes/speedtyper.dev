import { Module } from '@nestjs/common';
import { ChallengesModule } from 'src/challenges/challenges.module';
import { RaceGateway } from './race.gateway';
import { RaceEvents } from './services/race-events.service';
import { RaceManager } from './services/race-manager.service';
import { SessionState } from './services/session-state.service';

@Module({
  imports: [ChallengesModule],
  providers: [RaceEvents, SessionState, RaceManager, RaceGateway],
})
export class RacesModule {}
