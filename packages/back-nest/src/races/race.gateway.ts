import { UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { socketCors } from 'src/config/cors';
import { RaceExceptions } from './race.exceptions';
import { AddKeyStrokeService } from './services/add-keystroke.service';
import { RaceEvents } from './services/race-events.service';
import { RaceManager } from './services/race-manager.service';
import { KeyStroke } from './services/race-player.service';
import { ResultsHandlerService } from './services/results-handler.service';
import { SessionState } from './services/session-state.service';

@WebSocketGateway(socketCors)
export class RaceGateway {
  @WebSocketServer()
  server: Server;
  logger = console;

  constructor(
    private raceManager: RaceManager,
    private sessionState: SessionState,
    private raceEvents: RaceEvents,
    private addKeyStrokeService: AddKeyStrokeService,
    private resultHandler: ResultsHandlerService,
  ) {}

  afterInit() {
    this.logger.info('[SpeedTyper.dev] Websocket Server Started.');
  }

  handleDisconnect(socket: Socket) {
    this.logger.info(
      `Client disconnected: ${socket.request.session.user.username}`,
    );
    const raceId = this.sessionState.getRaceID(socket);
    const user = this.sessionState.getUser(socket);
    this.raceManager.leaveRace(user, raceId);
    this.sessionState.removeRaceID(socket);
    this.raceEvents.leftRace(socket, user, raceId);
  }

  handleConnection(socket: Socket) {
    this.logger.info(
      `Client connected: ${socket.request.session.user.username}`,
    );
  }

  @UseFilters(new RaceExceptions())
  @SubscribeMessage('refresh_challenge')
  async onRefreshChallenge(socket: Socket) {
    const raceId = this.sessionState.getRaceID(socket);
    if (!raceId) return;
    const user = this.sessionState.getUser(socket);
    if (this.raceManager.isOwner(user.id, raceId)) {
      const race = await this.raceManager.refresh(raceId);
      this.raceEvents.updatedRace(socket, race);
    }
  }

  @SubscribeMessage('play')
  async onPlay(socket: Socket) {
    const user = this.sessionState.getUser(socket);
    const race = await this.raceManager.create(user);
    this.raceEvents.createdRace(socket, race);
    this.sessionState.saveRaceID(socket, race.id);
  }

  @UseFilters(new RaceExceptions())
  @SubscribeMessage('key_stroke')
  async onKeyStroke(socket: Socket, keystroke: KeyStroke) {
    this.addKeyStrokeService.validate(socket, keystroke);
    this.addKeyStrokeService.addKeyStroke(socket, keystroke);
    this.resultHandler.handleResult(socket);
  }

  @SubscribeMessage('join')
  async onJoin(socket: Socket, id: string) {
    const user = this.sessionState.getUser(socket);
    const race = this.raceManager.join(user, id);
    if (!race) {
      // if there is no race with the ID in the state
      // we recreate a race for the user
      // this makes sure that the game does not crash for the user
      // TODO: we should create a race with the same ID, and even same challenge selected
      // So that the other people in the race can then join the same room
      // instead of creating their own through this same functionality
      // we do however have to reset the progress for all participants as it is only kept in state
      return this.onPlay(socket);
    }
    this.raceEvents.joinedRace(socket, race, user);
    this.sessionState.saveRaceID(socket, id);
  }

  @SubscribeMessage('start_race')
  async onStart(socket: Socket) {
    const user = this.sessionState.getUser(socket);
    const raceID = this.sessionState.getRaceID(socket);
    const race = this.raceManager.getRace(raceID);
    if (!race.countdown && !race.startTime && race.owner === user.id) {
      race.countdown = true;
      const seconds = 5;
      for (let i = seconds; i > 0; i--) {
        const delay = seconds - i;
        const timeout = setTimeout(() => {
          this.raceEvents.countdown(socket, race.id, i);
        }, delay * 1000);
        race.timeouts.push(timeout);
      }

      const timeout = setTimeout(() => {
        race.start();
        this.raceEvents.raceStarted(socket, race);
        race.timeouts = [];
      }, seconds * 1000);

      race.timeouts.push(timeout);
    }
  }
}
