import { Injectable } from '@nestjs/common';
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

  async refresh(id: string): Promise<Race> {
    const challenge = await this.challengeService.getRandom();
    const race = this.races[id];
    race.challenge = challenge;
    race.resetProgress();
    return race;
  }

  getRace(id: string): Race {
    const race = this.races[id];
    if (!race) throw new RaceDoesNotExist(id);
    return race;
  }

  join(user: User, raceId: string): Race | null {
    const race = this.races[raceId];
    // it's important to return null instead of throwing
    // a RaceDoesNotExist error because the exception filter
    // sends a race_does_not_exist event back to the client
    // and the client tries to join the race
    // in the controller we create a game if no game exists
    // preventing an infinite loop
    // TODO: this should be handled better in the future
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
