import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { ChallengeService } from 'src/challenges/services/challenge.service';
import { User } from 'src/users/entities/user.entity';

export interface RaceState {
  id: string;
  challenge: Challenge;
  owner: string;
  members: Record<string, User>;
}

@Injectable()
export class RaceManager {
  private races: Record<string, RaceState> = {};

  constructor(private challengeService: ChallengeService) {}

  async create(user: User): Promise<RaceState> {
    const id = randomUUID();
    const challenge = await this.challengeService.getRandom();
    const race = {
      id: id,
      challenge,
      owner: user.id,
      members: {
        [user.id]: user,
      },
    };
    this.races[id] = race;
    return race;
  }

  async refresh(id: string): Promise<Challenge> {
    const challenge = await this.challengeService.getRandom();
    this.races[id].challenge = challenge;
    return challenge;
  }

  join(user: User, raceId: string): RaceState | null {
    const race = this.races[raceId];
    if (!race) return null;
    race.members[user.id] = user;
    return race;
  }

  isOwner(userId: string, raceId: string): boolean {
    const race = this.races[raceId];
    if (!race) throw new RaceDoesNotExist(raceId);
    return race.owner === userId;
  }
}

export class RaceDoesNotExist extends Error {
  id: string;
  constructor(id: string) {
    super(`Race with id=${id} does not exist`);
    this.id = id;
    Object.setPrototypeOf(this, RaceDoesNotExist.prototype);
  }
}
