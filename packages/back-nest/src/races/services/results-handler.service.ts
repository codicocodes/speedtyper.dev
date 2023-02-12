import { BadRequestException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ResultFactoryService } from 'src/results/services/result-factory.service';
import { ResultService } from 'src/results/services/results.service';
import { RaceEvents } from './race-events.service';
import { RaceManager } from './race-manager.service';
import { SessionState } from './session-state.service';

export class InvalidKeyStroke extends BadRequestException {
  constructor() {
    super('Incorrect keystroke');
  }
}

@Injectable()
export class ResultsHandlerService {
  constructor(
    private manager: RaceManager,
    private session: SessionState,
    private factory: ResultFactoryService,
    private events: RaceEvents,
    private results: ResultService,
  ) {}
  async handleResult(socket: Socket) {
    const user = await this.session.getUser(socket);
    const raceId = await this.session.getRaceID(socket);
    const race = this.manager.getRace(raceId);
    const player = race.getPlayer(user.id);
    if (player.progress === 100) {
      let result = this.factory.factory(race, player, user);
      if (!user.isAnonymous) {
        result = await this.results.create(result);
      }
      this.events.raceCompleted(socket, result);
    }
  }
}
