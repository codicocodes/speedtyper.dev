import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { TrackingService } from 'src/tracking/tracking.service';
import { KeyStrokeValidationService } from './keystroke-validator.service';
import { ProgressService } from './progress.service';
import { RaceEvents } from './race-events.service';
import { RaceManager } from './race-manager.service';
import { KeyStroke } from './race-player.service';
import { ResultsHandlerService } from './results-handler.service';
import { SessionState } from './session-state.service';

@Injectable()
export class AddKeyStrokeService {
  constructor(
    private manager: RaceManager,
    private session: SessionState,
    private validator: KeyStrokeValidationService,
    private progressService: ProgressService,
    private trackingService: TrackingService,
    private events: RaceEvents,
    private resultHandler: ResultsHandlerService,
  ) {}

  async validate(socket: Socket, keyStroke: KeyStroke) {
    const user = await this.session.getUser(socket);
    const raceId = await this.session.getRaceID(socket);
    const player = this.manager.getPlayer(raceId, user.id);
    this.validator.validateKeyStroke(player, keyStroke);
  }

  async addKeyStroke(socket: Socket, keyStroke: KeyStroke) {
    const user = await this.session.getUser(socket);
    const raceId = await this.session.getRaceID(socket);
    const player = this.manager.getPlayer(raceId, user.id);
    if (player.hasNotStartedTyping()) {
      this.trackingService.trackRaceStarted();
    }
    player.addKeyStroke(keyStroke);
    if (keyStroke.correct) {
      player.progress = this.progressService.calculateProgress(player);
      const code = this.manager.getCode(raceId);
      player.updateLiteral(code, keyStroke);
      this.events.progressUpdated(socket, raceId, player);
    }
    this.syncStartTime(raceId, new Date(keyStroke.timestamp));
    const race = this.manager.getRace(raceId);
    this.resultHandler.handleResult(race, user);
  }

  async syncStartTime(raceId: string, timestamp: Date) {
    const race = this.manager.getRace(raceId);
    if (!race.isMultiplayer()) {
      race.startTime = race.startTime ?? timestamp;
    }
  }
}
