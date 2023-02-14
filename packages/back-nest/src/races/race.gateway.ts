import { UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { socketCors } from 'src/config/cors';
import {
  InvalidKeystrokeFilter,
  RaceDoesNotExistFilter,
} from './race.exceptions';
import { AddKeyStrokeService } from './services/add-keystroke.service';
import { CountdownService } from './services/countdown.service';
import { Locker } from './services/locker.service';
import { RaceEvents } from './services/race-events.service';
import { RaceManager } from './services/race-manager.service';
import { KeyStroke } from './services/race-player.service';
import { SessionState } from './services/session-state.service';

@WebSocketGateway(socketCors)
export class RaceGateway {
  @WebSocketServer()
  server: Server;
  logger = console;

  constructor(
    private raceManager: RaceManager,
    private session: SessionState,
    private raceEvents: RaceEvents,
    private addKeyStrokeService: AddKeyStrokeService,
    private manageRaceLock: Locker,
    private countdownService: CountdownService,
  ) {}

  afterInit(server: Server) {
    this.logger.info('[SpeedTyper.dev] Websocket Server Started.');
    this.raceEvents.server = server;
  }

  handleDisconnect(socket: Socket) {
    this.logger.info(
      `Client disconnected: ${socket.request.session.user.username}`,
    );
    const raceId = this.session.getRaceID(socket);
    const user = this.session.getUser(socket);
    this.raceManager.leaveRace(socket, user, raceId);
    this.session.removeRaceID(socket);
    this.manageRaceLock.release(socket.id);
  }

  handleConnection(socket: Socket) {
    this.logger.info(
      `Client connected: ${socket.request.session.user.username}`,
    );
    socket.request.session.save();
  }

  @UseFilters(new RaceDoesNotExistFilter())
  @SubscribeMessage('refresh_challenge')
  async onRefreshChallenge(socket: Socket) {
    const socketID = socket.id;
    await this.manageRaceLock.runIfOpen(socketID, async () => {
      const raceId = this.session.getRaceID(socket);
      if (!raceId) {
        this.manageRaceLock.release(socket.id);
        this.onPlay(socket);
        return;
      }
      const user = this.session.getUser(socket);
      if (this.raceManager.isOwner(user.id, raceId)) {
        const race = await this.raceManager.refresh(raceId);
        this.raceEvents.updatedRace(socket, race);
      }
    });
  }

  @SubscribeMessage('play')
  async onPlay(socket: Socket) {
    const socketID = socket.id;
    await this.manageRaceLock.runIfOpen(socketID, async () => {
      const user = this.session.getUser(socket);
      const raceId = this.session.getRaceID(socket);
      this.raceManager.leaveRace(socket, user, raceId);
      const race = await this.raceManager.create(user);
      this.raceEvents.createdRace(socket, race);
      this.session.saveRaceID(socket, race.id);
    });
  }

  @UseFilters(new RaceDoesNotExistFilter(), new InvalidKeystrokeFilter())
  @SubscribeMessage('key_stroke')
  async onKeyStroke(socket: Socket, keystroke: KeyStroke) {
    keystroke.timestamp = new Date().getTime();
    await this.addKeyStrokeService.validate(socket, keystroke);
    this.addKeyStrokeService.addKeyStroke(socket, keystroke);
  }

  @SubscribeMessage('join')
  async onJoin(socket: Socket, id: string) {
    console.log('join', socket.id);
    this.manageRaceLock.runIfOpen(socket.id, async () => {
      const user = this.session.getUser(socket);
      const raceID = this.session.getRaceID(socket);
      this.raceManager.leaveRace(socket, user, raceID);
      const race = this.raceManager.join(user, id);
      if (!race) {
        console.log('no race...');
        // if there is no race with the ID in the state
        // we recreate a race for the user
        // this makes sure that the game does not crash for the user
        // TODO: we should create a race with the same ID, and even same challenge selected
        // So that the other people in the race can then join the same room
        // instead of creating their own through this same functionality
        // we do however have to reset the progress for all participants as it is only kept in state
        this.manageRaceLock.release(socket.id);
        return this.onPlay(socket);
      }
      this.raceEvents.joinedRace(socket, race, user);
      this.session.saveRaceID(socket, id);
    });
  }

  @SubscribeMessage('start_race')
  async onStart(socket: Socket) {
    const user = this.session.getUser(socket);
    const raceID = this.session.getRaceID(socket);
    const race = this.raceManager.getRace(raceID);
    if (race.canStartRace(user.id)) {
      this.countdownService.countdown(race);
    }
  }
}
