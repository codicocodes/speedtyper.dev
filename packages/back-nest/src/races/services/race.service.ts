import { Exclude, instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { User } from 'src/users/entities/user.entity';

export class RacePlayer {
  id: string;
  username: string;
  recentlyTypedLiteral?: string;
  progress: number;
  @Exclude()
  typedChars: any[];

  toJSON() {
    return instanceToPlain(this);
  }

  static fromUser(user: User) {
    const player = new RacePlayer();
    player.id = user.id;
    player.username = user.username;
    player.progress = 0;
    player.recentlyTypedLiteral = '';
    player.typedChars = [];
    return player;
  }
}

export class Race {
  id: string;
  challenge: Challenge;
  owner: string;
  members: Record<string, RacePlayer>;

  constructor(owner: User, challenge: Challenge) {
    this.id = randomUUID();
    this.members = {};
    this.owner = owner.id;
    this.challenge = challenge;
    this.addMember(owner);
  }

  addMember(user: User) {
    this.members[user.id] = RacePlayer.fromUser(user);
  }
}
