import { Exclude, instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { User } from 'src/users/entities/user.entity';
import { RacePlayer } from './race-player.service';

export class Race {
  id: string;
  challenge: Challenge;
  owner: string;
  members: Record<string, RacePlayer>;
  @Exclude()
  literals: string[];
  timeouts: NodeJS.Timeout[];

  startTime?: Date;
  countdown: boolean;

  toJSON() {
    return instanceToPlain(this);
  }

  constructor(owner: User, challenge: Challenge, literals: string[]) {
    this.id = randomUUID().replaceAll('-', '');
    this.members = {};
    this.owner = owner.id;
    this.challenge = challenge;
    this.literals = literals;
    this.timeouts = [];
    this.countdown = false;
    this.addMember(owner, literals);
  }

  start() {
    this.startTime = new Date();
  }

  getPlayer(id: string) {
    return this.members[id];
  }

  resetProgress(literals: string[]) {
    Object.values(this.members).forEach((player) => {
      player.reset([...literals]);
    });
    this.startTime = undefined;
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
    this.timeouts = [];
    this.countdown = false;
  }

  addMember(user: User, literals: string[]) {
    this.members[user.id] = RacePlayer.fromUser(this.id, user, [...literals]);
  }

  removeMember(user: User) {
    delete this.members[user.id];
  }
}
