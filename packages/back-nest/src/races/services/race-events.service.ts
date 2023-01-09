import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Result } from 'src/results/entities/result.entity';
import { User } from 'src/users/entities/user.entity';
import { RacePlayer } from './race-player.service';
import { Race } from './race.service';

@Injectable()
export class RaceEvents {
  createdRace(socket: Socket, race: Race) {
    socket.join(race.id);
    socket.emit('race_joined', race);
    socket.emit('challenge_selected', race.challenge);
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

  progressUpdated(socket: Socket, raceId: string, player: RacePlayer) {
    socket.to(raceId).emit('progress_updated', player);
    socket.emit('progress_updated', player);
  }

  raceCompleted(socket: Socket, result: Result) {
    const raceId = socket.request.session.raceId;
    socket.to(raceId).emit('race_completed', result);
    socket.emit('race_completed', result);
  }

  raceDoesNotExist(socket: Socket, id: string) {
    socket.emit('race_does_not_exist', id);
  }
}
