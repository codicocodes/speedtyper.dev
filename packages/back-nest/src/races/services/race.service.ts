import { Exclude, instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { User } from 'src/users/entities/user.entity';

export interface KeyStroke {
  key: string;
  timestamp: number;
  progress: number;
  index: number;
}

export class RacePlayer {
  id: string;
  username: string;
  recentlyTypedLiteral: string;
  literals: string[];
  progress: number;

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

  updateProgress(keyStroke: KeyStroke) {
    this.progress = keyStroke.progress;
    this.typedKeyStrokes.push(keyStroke);
  }

  updateLiteral(code: string, keyStroke: KeyStroke) {
    const inputLeft = code.substring(keyStroke.index);
    const literal = this.literals[0];
    const startsWithLiteral = inputLeft.trimStart().startsWith(literal);
    if (startsWithLiteral && this.literals.length > 1) {
      this.literals.shift();
      this.recentlyTypedLiteral = literal;
    }
  }

  static fromUser(user: User, literals: string[]) {
    const player = new RacePlayer();
    player.id = user.id;
    player.username = user.username;
    player.progress = 0;
    player.recentlyTypedLiteral = literals.shift();
    player.literals = literals;
    player.typedKeyStrokes = [];
    return player;
  }
}

export class Race {
  id: string;
  challenge: Challenge;
  owner: string;
  members: Record<string, RacePlayer>;
  literals: string[];

  constructor(owner: User, challenge: Challenge, literals: string[]) {
    this.id = randomUUID().replaceAll('-', '');
    this.members = {};
    this.owner = owner.id;
    this.challenge = challenge;
    this.literals = literals;
    this.addMember(owner, literals);
  }

  getPlayer(id: string) {
    return this.members[id];
  }

  resetProgress(literals: string[]) {
    Object.values(this.members).forEach((player) => {
      player.reset(literals);
    });
  }

  addMember(user: User, literals: string[]) {
    this.members[user.id] = RacePlayer.fromUser(user, literals);
  }
}
