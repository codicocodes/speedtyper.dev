import { Injectable } from '@nestjs/common';
import { RaceEvents } from './race-events.service';
import { Race } from './race.service';

@Injectable()
export class CountdownService {
  constructor(private raceEvents: RaceEvents) {}
  async countdown(race: Race) {
    race.countdown = true;
    const seconds = 5;
    for (let i = seconds; i > 0; i--) {
      const delay = seconds - i;
      const timeout = setTimeout(() => {
        this.raceEvents.countdown(race.id, i);
      }, delay * 1000);
      race.timeouts.push(timeout);
    }
    const timeout = setTimeout(() => {
      race.start();
      this.raceEvents.raceStarted(race);
      race.timeouts = [];
      race.countdown = false;
    }, seconds * 1000);
    race.timeouts.push(timeout);
  }
}
