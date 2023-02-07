import { Exclude, instanceToPlain } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export interface KeyStroke {
  key: string;
  timestamp: number;
  correct: boolean;
  index: number;
}

export class RacePlayer {
  id: string;
  username: string;

  recentlyTypedLiteral: string;

  @Exclude()
  literalOffset: number;

  @Exclude()
  literals: string[];

  progress: number;

  @Exclude()
  raceId: string;

  @Exclude()
  typedKeyStrokes: KeyStroke[];

  toJSON() {
    return instanceToPlain(this);
  }

  reset(literals: string[]) {
    this.literals = literals;
    this.literalOffset = 0;
    this.recentlyTypedLiteral = this.literals[this.literalOffset];
    this.progress = 0;
    this.typedKeyStrokes = [];
  }

  validKeyStrokes() {
    const keyStrokes = this.typedKeyStrokes;
    const validKeyStrokes = Object.values(
      Object.fromEntries(
        keyStrokes
          .filter((keyStroke) => keyStroke.correct)
          .map((keyStroke) => [keyStroke.index, keyStroke]),
      ),
    );
    return validKeyStrokes;
  }

  incorrectKeyStrokes() {
    const incorrectKeyStrokes = this.typedKeyStrokes.filter(
      (keyStroke) => !keyStroke.correct,
    );
    return incorrectKeyStrokes;
  }

  getValidInput() {
    const validInput = this.validKeyStrokes()
      .map((keyStroke) => keyStroke.key)
      .join('');
    return validInput;
  }

  addKeyStroke(keyStroke: KeyStroke) {
    keyStroke.timestamp = new Date().getTime();
    this.typedKeyStrokes.push(keyStroke);
    this.recentlyTypedLiteral = this.literals[this.literalOffset];
  }

  updateLiteral(code: string, keyStroke: KeyStroke) {
    const untypedCode = code.substring(keyStroke.index);
    const literal = this.literals[0];
    const startsWithLiteral = untypedCode.trimStart().startsWith(literal);
    if (startsWithLiteral && this.literals.length > 1) {
      this.literalOffset++;
    }
  }

  static fromUser(raceId: string, user: User, literals: string[]) {
    const player = new RacePlayer();
    player.id = user.id;
    player.raceId = raceId;
    player.username = user.username;
    player.progress = 0;
    player.literalOffset = 0;
    player.literals = literals;
    player.recentlyTypedLiteral = player.literals[player.literalOffset];
    player.typedKeyStrokes = [];
    return player;
  }
}
