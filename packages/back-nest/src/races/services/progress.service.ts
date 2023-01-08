import { Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { RaceManager } from './race-manager.service';
import { RacePlayer } from './race-player.service';

@Injectable()
export class ProgressService {
  constructor(private raceManager: RaceManager) {}
  calculateProgress(player: RacePlayer) {
    const currentInput = player.getValidInput();
    const code = this.raceManager.getCode(player.raceId);
    const strippedFullCode = Challenge.getStrippedCode(code);
    const progress = Math.floor(
      (currentInput.length / strippedFullCode.length) * 100,
    );
    return progress;
  }
}
