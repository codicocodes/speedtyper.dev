import * as Sentry from '@sentry/node';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InvalidKeystrokeException } from './services/keystroke-validator.service';
import { RaceEvents } from './services/race-events.service';
import { RaceDoesNotExist } from './services/race-manager.service';
import { SessionState } from './services/session-state.service';

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
  sessionState: SessionState;
  constructor() {
    super();
    this.raceEvents = new RaceEvents();
    this.sessionState = new SessionState();
  }

  async catch(error: RaceDoesNotExist, host: ArgumentsHost) {
    const socket = getSocketFromArgs(host);
    this.sessionState.removeRaceID(socket);
    this.raceEvents.raceDoesNotExist(socket, error.id);
  }
}

@Catch(InvalidKeystrokeException)
export class InvalidKeystrokeFilter extends BaseWsExceptionFilter {
  async catch(error: InvalidKeystrokeException) {
    Sentry.withScope((scope) => {
      const player = error.race.members[error.userId];
      const data = {
        challengeId: error.race.challenge.id,
        expected: error.expected,
        input: error.input,
        keystroke: error.keystroke,
        userId: error.userId,
      };
      const typedKeystrokes = player.typedKeyStrokes;
      const validKeyStrokes = player.validKeyStrokes();
      scope.setUser({
        id:
          process.env.NODE_ENV === 'production'
            ? error.userId
            : 'local-testing',
      });
      scope.setExtras({ error: data, typedKeystrokes, validKeyStrokes });
      Sentry.captureException(error);
    });
  }
}
