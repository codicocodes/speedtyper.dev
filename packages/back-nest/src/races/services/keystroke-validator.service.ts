import { BadRequestException, Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { RaceManager } from './race-manager.service';
import { KeystrokeDTO, RacePlayer } from './race-player.service';
import { Race } from './race.service';

export class InvalidKeystrokeException extends Error {
  userId: string;
  keystroke: KeystrokeDTO;
  input: string;
  expected: string;
  race: Race;
  constructor(
    userId: string,
    keystroke: KeystrokeDTO,
    userInput: string,
    expectedUserInput: string,
    race: Race,
  ) {
    super('Unexpected keystroke received2');
    this.userId = userId;
    this.keystroke = keystroke;
    this.input = userInput;
    this.expected = expectedUserInput;
    this.race = race;
  }
}

export class RaceNotStartedException extends BadRequestException {
  constructor() {
    super('Race not started');
  }
}

export function getCurrentInputBeforeKeystroke(
  player: RacePlayer,
  keystroke: KeystrokeDTO,
) {
  const currentInputBeforeKey = player
    .validKeyStrokes()
    .filter((stroke) => stroke.index < keystroke.index)
    .map((stroke) => stroke.key)
    .join('');
  return currentInputBeforeKey;
}

@Injectable()
export class KeyStrokeValidationService {
  constructor(private raceManager: RaceManager) {}

  validateKeyStroke(player: RacePlayer, recentKeyStroke: KeystrokeDTO) {
    this.validateRaceStarted(player.raceId);
    const currentInputBeforeKey = getCurrentInputBeforeKeystroke(
      player,
      recentKeyStroke,
    );
    const userInput = currentInputBeforeKey + recentKeyStroke.key;
    const expectedInput = this.getStrippedCode(player.raceId, recentKeyStroke);
    const correct = userInput === expectedInput;
    if (recentKeyStroke.correct && recentKeyStroke.correct !== correct) {
      throw new InvalidKeystrokeException(
        player.id,
        recentKeyStroke,
        userInput,
        expectedInput,
        this.raceManager.getRace(player.raceId),
      );
    }
  }

  validateRaceStarted(raceID: string) {
    const race = this.raceManager.getRace(raceID);
    if (!race.startTime && race.isMultiplayer()) {
      throw new RaceNotStartedException();
    }
  }

  private getStrippedCode(raceId: string, keystroke: KeystrokeDTO) {
    const code = this.raceManager.getCode(raceId);
    const strippedCode = Challenge.getStrippedCode(
      code.substring(0, keystroke.index),
    );
    return strippedCode;
  }
}
