import { Exclude, instanceToPlain } from 'class-transformer';
import { LiteralService } from 'src/challenges/services/literal.service';
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

  @Exclude()
  literalService: LiteralService;

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
  }

  updateLiteral(code: string, keyStroke: KeyStroke) {
    const untypedCode = code.substring(keyStroke.index);
    const nextLiteral = this.literals[this.literalOffset + 1];
    const startsWithNextLiteral = this.literalService
      .calculateLiterals(untypedCode.trimStart())
      .join('')
      .startsWith(nextLiteral);
    if (startsWithNextLiteral && this.literals.length > 1) {
      this.literalOffset++;
    }
    this.recentlyTypedLiteral = this.literals[this.literalOffset];
  }

  hasNotStartedTyping(): boolean {
    return this.typedKeyStrokes.length === 0;
  }

  static fromUser(raceId: string, user: User, literals: string[]) {
    const player = new RacePlayer();
    player.id = user.id;
    player.raceId = raceId;
    player.username = user.username;
    player.progress = 0;
    player.literals = literals;
    player.recentlyTypedLiteral = player.literals[0];
    player.literalOffset = 0;
    player.typedKeyStrokes = [];
    player.literalService = new LiteralService();
    return player;
  }
}
