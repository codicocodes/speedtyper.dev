import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RaceEvents } from './services/race-events.service';
import { RaceDoesNotExist } from './services/race-manager.service';

@Catch(RaceDoesNotExist)
export class RaceExceptions extends BaseWsExceptionFilter {
  raceEvents: RaceEvents;
  constructor() {
    super();
    this.raceEvents = new RaceEvents();
  }

  async catch(error: RaceDoesNotExist, host: ArgumentsHost) {
    const socket = this.getSocketFromArgs(host);
    this.raceEvents.raceDoesNotExist(socket, error.id);
  }

  getSocketFromArgs(host: ArgumentsHost): Socket {
    const args = host.getArgs();
    for (const arg of args) {
      if (arg instanceof Socket) {
        return arg;
      }
    }
  }
}
