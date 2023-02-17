import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Result } from 'src/results/entities/result.entity';
import { User } from 'src/users/entities/user.entity';
import { RacePlayer } from './race-player.service';
import { Race } from './race.service';

@Injectable()
export class RaceEvents {
  server: Server;

  getPlayerCount() {
    return this.server.sockets.sockets.size;
  }

  createdRace(socket: Socket, race: Race) {
    socket.join(race.id);
    socket.emit('race_joined', race);
    socket.emit('challenge_selected', race.challenge);
  }

  countdown(raceID: string, i: number) {
    const event = 'countdown';
    this.server.to(raceID).emit(event, i);
  }

  raceStarted(race: Race) {
    this.server.to(race.id).emit('race_started', race.startTime);
  }

  updatedRace(socket: Socket, race: Race) {
    socket.emit('race_joined', race);
    socket.emit('challenge_selected', race.challenge);
    socket.to(race.id).emit('race_joined', race);
    socket.to(race.id).emit('challenge_selected', race.challenge);
  }

  joinedRace(socket: Socket, race: Race, user: User) {
    socket.join(race.id);
    socket.emit('race_joined', race);
    socket.emit('challenge_selected', race.challenge);
    socket.to(race.id).emit('member_joined', race.members[user.id]);
  }

  leftRace(socket: Socket, user: User, raceId: string) {
    socket.to(raceId).emit('member_left', user.id);
  }

  progressUpdated(socket: Socket, raceId: string, player: RacePlayer) {
    socket.to(raceId).emit('progress_updated', player);
    socket.emit('progress_updated', player);
  }

  raceCompleted(raceId: string, result: Result) {
    this.server.to(raceId).emit('race_completed', result);
  }

  raceDoesNotExist(socket: Socket, id: string) {
    socket.emit('race_does_not_exist', id);
  }
  async logConnectedSockets() {
    const sockets = await this.server.fetchSockets();
    console.log('Connected sockets: ', sockets.length);
}
