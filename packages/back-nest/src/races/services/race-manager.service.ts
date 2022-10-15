import { Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { ChallengeService } from 'src/challenges/services/challenge.service';
import { User } from 'src/users/entities/user.entity';
import { Race } from './race.service';

@Injectable()
export class RaceManager {
  private races: Record<string, Race> = {};

  constructor(private challengeService: ChallengeService) {}

  async create(user: User): Promise<Race> {
    const challenge = await this.challengeService.getRandom();
    const race = new Race(user, challenge);
    this.races[race.id] = race;
    return race;
  }

  async refresh(id: string): Promise<Challenge> {
    const challenge = await this.challengeService.getRandom();
    this.races[id].challenge = challenge;
    return challenge;
  }

  join(user: User, raceId: string): Race | null {
    const race = this.races[raceId];
    if (!race) return null;
    race.addMember(user);
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
