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
    const currentInput = player.getValidInput() + recentKeyStroke.key;
    const strippedCode = this.getStrippedCode(player.raceId, recentKeyStroke);
    if (currentInput !== strippedCode) {
      throw new InvalidKeyStroke();
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
