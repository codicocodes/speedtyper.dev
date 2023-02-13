import * as Sentry from '@sentry/node';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InvalidKeystrokeException } from './services/keystroke-validator.service';
import { RaceEvents } from './services/race-events.service';
import { RaceDoesNotExist } from './services/race-manager.service';

export function getSocketFromArgs(host: ArgumentsHost): Socket {
  const args = host.getArgs();
  for (const arg of args) {
    if (arg instanceof Socket) {
      return arg;
    }
  }
}

@Catch(RaceDoesNotExist)
export class RaceDoesNotExistFilter extends BaseWsExceptionFilter {
  raceEvents: RaceEvents;
  constructor() {
    super();
    this.raceEvents = new RaceEvents();
  }

  async catch(error: RaceDoesNotExist, host: ArgumentsHost) {
    const socket = getSocketFromArgs(host);
    this.raceEvents.raceDoesNotExist(socket, error.id);
  }
}

@Catch(InvalidKeystrokeException)
export class InvalidKeystrokeFilter extends BaseWsExceptionFilter {
  async catch(error: InvalidKeystrokeException) {
    Sentry.withScope((scope) => {
      const data = {
        challengeId: error.race.challenge.id,
        expected: error.expected,
        input: error.input,
        keystroke: error.keystroke,
        userId: error.userId,
      };
      scope.setUser({ id: error.userId });
      scope.setExtras({ error: data });
      Sentry.captureException(error);
    });
  }
}
