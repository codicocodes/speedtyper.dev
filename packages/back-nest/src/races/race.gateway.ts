import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { gatewayMetadata } from 'src/config/cors';
import { RaceSettingsDTO } from './entities/race-settings.dto';
import {
  InvalidKeystrokeFilter,
  RaceDoesNotExistFilter,
} from './race.exceptions';
import { AddKeyStrokeService } from './services/add-keystroke.service';
import { CountdownService } from './services/countdown.service';
import { Locker } from './services/locker.service';
import { RaceEvents } from './services/race-events.service';
import { RaceManager } from './services/race-manager.service';
import { KeystrokeDTO } from './services/race-player.service';
import { SessionState } from './services/session-state.service';

@WebSocketGateway(gatewayMetadata)
export class RaceGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private raceManager: RaceManager,
    private session: SessionState,
    private raceEvents: RaceEvents,
    private addKeyStrokeService: AddKeyStrokeService,
    private manageRaceLock: Locker,
    private countdownService: CountdownService,
  ) { }

  afterInit(server: Server) {
    console.info('[SpeedTyper.dev] Websocket Server Started.');
    this.raceEvents.server = server;
  }

  handleDisconnect(socket: Socket) {
    console.info(
      `Client disconnected: ${socket.request.session.user.username}`,
    );
    const raceId = this.session.getRaceID(socket);
    const user = this.session.getUser(socket);
    this.raceManager.leaveRace(user, raceId);
    this.session.removeRaceID(socket);
    this.manageRaceLock.release(socket.id);
  }

  async handleConnection(socket: Socket) {
    const userId = this.session.getUser(socket).id;
    const userIsAlreadyPlaying = this.raceManager.userIsAlreadyPlaying(userId);
    for (const [sid, s] of this.server.sockets.sockets) {
      // We need to cleanup other sockets for the same user
      // Because we can not have several instances of the same user in the same race twice
      // Consider adding this possibility, but for different races
      if (sid === socket.id) {
        console.log('Same socket id, keeping.');
        continue;
      }
      if (s.request.session.user.id === userId) {
        console.log(
          'Different socket id, same user. Disconnecting previous socket',
        );
        if (userIsAlreadyPlaying) {
          this.raceManager.leaveRace(
            s.request.session.user,
            s.request.session.raceId,
          );
        }
        s.disconnect();
      }

      if (!this.raceManager.userIsAlreadyPlaying(s.request.session.user.id)) {
        console.log(
          'Disconnecting because socket is not playing: ',
          s.request.session.user.username,
          s.request.session.user.id,
        );
        s.disconnect();
        continue
      }

      console.log(
        'Keeping: ',
        s.request.session.user.username,
        s.request.session.user.id,
      );
    }

    console.info(
      `Client connected: ${socket.request.session.user.username} - ${socket.id}`,
    );
  }

  @UseFilters(new RaceDoesNotExistFilter())
  @SubscribeMessage('refresh_challenge')
  async onRefreshChallenge(socket: Socket, settings: RaceSettingsDTO) {
    this.raceEvents.logConnectedSockets();
    const socketID = socket.id;
    await this.manageRaceLock.runIfOpen(socketID, async () => {
      const raceId = this.session.getRaceID(socket);
      if (!raceId) {
        this.manageRaceLock.release(socket.id);
        this.onPlay(socket, settings);
        return;
      }
      const user = this.session.getUser(socket);
      if (this.raceManager.isOwner(user.id, raceId)) {
        const race = await this.raceManager.refresh(raceId, settings.language);
        this.raceEvents.updatedRace(socket, race);
      }
    });
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('play')
  async onPlay(socket: Socket, settings: RaceSettingsDTO) {
    const socketID = socket.id;
    await this.manageRaceLock.runIfOpen(socketID, async () => {
      const user = this.session.getUser(socket);
      const raceId = this.session.getRaceID(socket);
      this.raceManager.leaveRace(user, raceId);
      const race = await this.raceManager.create(user, settings);
      this.raceEvents.createdRace(socket, race);
      this.session.saveRaceID(socket, race.id);
    });
  }

  @UseFilters(new RaceDoesNotExistFilter(), new InvalidKeystrokeFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('key_stroke')
  async onKeyStroke(socket: Socket, keystroke: KeystrokeDTO) {
    keystroke.timestamp = new Date().getTime();
    this.addKeyStrokeService.validate(socket, keystroke);
    this.addKeyStrokeService.addKeyStroke(socket, keystroke);
  }

  @SubscribeMessage('join')
  async onJoin(socket: Socket, id: string) {
    this.manageRaceLock.runIfOpen(socket.id, async () => {
      const user = this.session.getUser(socket);
      const raceID = this.session.getRaceID(socket);
      this.raceManager.leaveRace(user, raceID);
      const race = this.raceManager.join(user, id);
      if (!race) {
        // if there is no race with the ID in the state
        // we recreate a race for the user
        // this makes sure that the game does not crash for the user
        // TODO: we should create a race with the same ID, and even same challenge selected
        // So that the other people in the race can then join the same room
        // instead of creating their own through this same functionality
        // we do however have to reset the progress for all participants as it is only kept in state
        this.manageRaceLock.release(socket.id);
        return this.onPlay(socket, { language: undefined, isPublic: false });
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
