import { BadRequestException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { KeyStrokeValidationService } from './keystroke-validator.service';
import { ProgressService } from './progress.service';
import { RaceEvents } from './race-events.service';
import { RaceManager } from './race-manager.service';
import { KeyStroke } from './race-player.service';
import { SessionState } from './session-state.service';

export class InvalidKeyStroke extends BadRequestException {
  constructor() {
    super('Incorrect keystroke');
  }
}

@Injectable()
export class AddKeyStrokeService {
  constructor(
    private manager: RaceManager,
    private session: SessionState,
    private validator: KeyStrokeValidationService,
    private progressService: ProgressService,
    private events: RaceEvents,
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
    player.addKeyStroke(keyStroke);
    player.progress = this.progressService.calculateProgress(player);
    const code = this.manager.getCode(raceId);
    player.updateLiteral(code, keyStroke);
    this.events.progressUpdated(socket, raceId, player);
  }
}
