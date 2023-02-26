import { BadRequestException, Injectable } from '@nestjs/common';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import { ChallengeService } from 'src/challenges/services/challenge.service';
import { LiteralService } from 'src/challenges/services/literal.service';
import { User } from 'src/users/entities/user.entity';
import { RaceSettingsDTO } from '../entities/race-settings.dto';
import { RaceEvents } from './race-events.service';
import { RacePlayer } from './race-player.service';
import { Race } from './race.service';

export interface PublicRace {
  id: string;
  ownerName: string;
  memberCount: number;
}

@Injectable()
export class RaceManager {
  private races: Record<string, Race> = {};

  constructor(
    private challengeService: ChallengeService,
    private literalsService: LiteralService,
    private raceEvents: RaceEvents,
  ) {}

  getOnlineCount(): number {
    const memberIds = Object.values(this.races)
      .flatMap((race) => Object.values(race.members))
      .map((member) => member.id);
    const uniqueMemberIds = new Set(memberIds);
    return uniqueMemberIds.size;
  }

  getPublicRaces(): PublicRace[] {
    const races = Object.values(this.races);
    const publicRaces = races
      .filter((race) => race.isPublic)
      .map((race) => {
        return race.toPublic();
      });
    return publicRaces;
  }

  syncUser(raceId: string, prevUserId: string, user: User) {
    const race = this.getRace(raceId);
    if (race.owner === prevUserId) {
      race.owner = user.id;
    }
    const player = race.members[prevUserId];
    player.id = user.id;
    player.username = user.username;
    delete race.members[prevUserId];
    race.members[user.id] = player;
  }

  debugSize(msg: string) {
    const racesSize = JSON.stringify(this.races).length;
    console.log(msg, {
      racesSize,
      races: Object.keys(this.races).length,
      players: this.getOnlineCount(),
    });
  }
  async create(user: User, settings: RaceSettingsDTO): Promise<Race> {
    this.debugSize('create');
    const challenge = await this.challengeService.getRandom(settings.language);
    const literals = this.literalsService.calculateLiterals(challenge.content);
    const race = new Race(user, challenge, literals);
    race.isPublic = settings.isPublic;
    this.races[race.id] = race;
    return race;
  }

  async refresh(id: string, language?: string): Promise<Race> {
    this.debugSize('refresh');
    const challenge = await this.challengeService.getRandom(language);
    const literals = this.literalsService.calculateLiterals(challenge.content);
    const race = this.races[id];
    race.challenge = challenge;
    race.literals = literals;
    race.resetProgress();
    return race;
  }

  getRace(id: string): Race {
    const race = this.races[id];
    if (!race) throw new RaceDoesNotExist(id);
    return race;
  }

  getPlayer(raceId: string, userId: string): RacePlayer {
    const race = this.getRace(raceId);
    return race.getPlayer(userId);
  }

  getChallenge(raceId: string): Challenge {
    const race = this.getRace(raceId);
    return race.challenge;
  }

  // Get the full code string of the currently active challenge for the provided race id
  getCode(raceId: string): string {
    return this.getChallenge(raceId).content;
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

  leaveRace(user: User, raceId: string) {
    const race = this.races[raceId];
    if (!race) return;
    race.removeMember(user);
    if (Object.values(race.members).length === 0) {
      delete this.races[raceId];
    } else if (race.owner === user.id) {
      race.owner = Object.values(race.members)[0].id;
    }
    this.raceEvents.leftRace(race, user);
  }

  isOwner(userId: string, raceId: string): boolean {
    const race = this.races[raceId];
    if (!race) throw new RaceDoesNotExist(raceId);
    return race.owner === userId;
  }

  userIsAlreadyPlaying(userId: string): boolean {
    return Object.values(this.races)
      .flatMap((race) => Object.keys(race.members))
      .includes(userId);
  }
}

export class RaceDoesNotExist extends BadRequestException {
  id: string;
  constructor(id: string) {
    super(`Race with id=${id} does not exist`);
    this.id = id;
    Object.setPrototypeOf(this, RaceDoesNotExist.prototype);
  }
}
