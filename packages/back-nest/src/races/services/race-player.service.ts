import { Exclude, instanceToPlain } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { LiteralService } from 'src/challenges/services/literal.service';
import { User } from 'src/users/entities/user.entity';

export class KeystrokeDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1)
  key: string;
  @IsNotEmpty()
  @IsNumber()
  timestamp: number;
  @IsNotEmpty()
  @IsBoolean()
  correct: boolean;
  @IsNotEmpty()
  @IsNumber()
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

  @Exclude()
  saved: boolean;

  progress: number;

  @Exclude()
  raceId: string;

  @Exclude()
  typedKeyStrokes: KeystrokeDTO[];

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
    this.saved = false;
    this.typedKeyStrokes = [];
  }

  validKeyStrokes() {
    const keyStrokes = this.typedKeyStrokes;
    const latestKeyStrokePerIndex = Object.fromEntries(
      keyStrokes.map((keyStroke) => {
        return [keyStroke.index, keyStroke];
      }),
    );
    const firstIncorrectKeystroke = Object.values(latestKeyStrokePerIndex).find(
      (keystroke) => !keystroke.correct,
    );
    const validKeyStrokes = Object.values(latestKeyStrokePerIndex)
      .filter((keyStroke) => keyStroke.correct)
      .filter((keystroke) =>
        firstIncorrectKeystroke
          ? keystroke.index < firstIncorrectKeystroke.index
          : true,
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

  addKeyStroke(keyStroke: KeystrokeDTO) {
    keyStroke.timestamp = new Date().getTime();
    this.typedKeyStrokes.push(keyStroke);
  }

  updateLiteral(code: string, keyStroke: KeystrokeDTO) {
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

  hasCompletedRace(): boolean {
    return this.progress === 100;
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
    player.saved = false;
    return player;
  }
}
