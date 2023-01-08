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
    this.recentlyTypedLiteral = this.literals.shift();
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

  getValidInput() {
    const validInput = this.validKeyStrokes()
      .map((keyStroke) => keyStroke.key)
      .join('');
    return validInput;
  }

  addKeyStroke(keyStroke: KeyStroke) {
    keyStroke.timestamp = new Date().getTime();
    this.typedKeyStrokes.push(keyStroke);
  }

  updateLiteral(code: string, keyStroke: KeyStroke) {
    const untypedCode = code.substring(keyStroke.index);
    const literal = this.literals[0];
    const startsWithLiteral = untypedCode.trimStart().startsWith(literal);
    if (startsWithLiteral && this.literals.length > 1) {
      this.literals.shift();
      this.recentlyTypedLiteral = literal;
    }
  }

  static fromUser(raceId: string, user: User, literals: string[]) {
    const player = new RacePlayer();
    player.id = user.id;
    player.raceId = raceId;
    player.username = user.username;
    player.progress = 0;
    player.recentlyTypedLiteral = literals.shift();
    player.literals = literals;
    player.typedKeyStrokes = [];
    return player;
  }
}
