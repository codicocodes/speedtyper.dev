import { BadRequestException, Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { RaceManager } from './race-manager.service';
import { KeyStroke, RacePlayer } from './race-player.service';

export class InvalidKeyStroke extends BadRequestException {
  constructor() {
    super('Incorrect keystroke');
  }
}

@Injectable()
export class KeyStrokeValidationService {
  constructor(private raceManager: RaceManager) {}

  validateAllKeyStrokes(player: RacePlayer) {
    const currentInput = player.getValidInput();
    const code = this.raceManager.getCode(player.raceId);
    const strippedCode = Challenge.getStrippedCode(code);
    if (currentInput !== strippedCode) {
      throw new InvalidKeyStroke();
    }
  }

  validateKeyStroke(player: RacePlayer, recentKeyStroke: KeyStroke) {
    this.validateRaceStarted(player.raceId);
    const currentInput = player.getValidInput() + recentKeyStroke.key;
    const strippedCode = this.getStrippedCode(player.raceId, recentKeyStroke);
    const correct = currentInput === strippedCode;
    if (recentKeyStroke.correct !== correct) {
      throw new Error('Unexpected keystroke');
    }
    recentKeyStroke.correct = correct;
  }

  validateRaceStarted(raceID: string) {
    const race = this.raceManager.getRace(raceID);
    if (!race.startTime && Object.keys(race.members).length > 1) {
      throw new Error('Unexpected keystroke');
    }
  }

  private getStrippedCode(raceId: string, recentKeyStroke: KeyStroke) {
    const code = this.raceManager.getCode(raceId);
    const strippedCode = Challenge.getStrippedCode(
      code.substring(0, recentKeyStroke.index),
    );
    return strippedCode;
  }
}
