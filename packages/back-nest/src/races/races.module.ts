import { Module } from '@nestjs/common';
import { RaceGateway } from './race.gateway';

@Module({
  providers: [RaceGateway],
})
export class RacesModule {}
