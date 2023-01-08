import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { KeyStrokeValidationService } from 'src/races/services/keystroke-validator.service';
import { RaceManager } from 'src/races/services/race-manager.service';
import { RacePlayer } from 'src/races/services/race-player.service';
import { User } from 'src/users/entities/user.entity';
import {
  SaveResultAnonymousNotAllowed,
  SaveResultRaceNotCompleted,
  SaveResultUserNotInRace,
} from '../errors';

@Injectable()
export class SaveResultRequestValidator {
  constructor(
    private raceManager: RaceManager,
    private keyStrokeValidator: KeyStrokeValidationService,
  ) {}

  validate(request: Request) {
    const raceId = request.session.raceId;
    const user = request.session.user;
    const userId = user.id;
    this.validateUser(user);
    this.validateRace(raceId, userId);
    this.validateKeyStrokes(raceId, userId);
  }

  validateKeyStrokes(raceId: string, userId: string) {
    const player = this.raceManager.getPlayer(raceId, userId);
    this.keyStrokeValidator.validateAllKeyStrokes(player);
  }

  validateUser(user: User) {
    if (user.isAnonymous) {
      throw new SaveResultAnonymousNotAllowed();
    }
  }

  validateRace(raceId: string, userId: string) {
    const player = this.getPlayer(raceId, userId);
    this.validateProgress(player);
  }

  validateProgress(player: RacePlayer) {
    if (player.progress != 100) {
      throw new SaveResultRaceNotCompleted();
    }
  }

  private getPlayer(raceId: string, userId: string) {
    const player = this.raceManager.getPlayer(raceId, userId);
    if (!player) {
      throw new SaveResultUserNotInRace();
    }
    return player;
  }
}
