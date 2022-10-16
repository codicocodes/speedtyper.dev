import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/users/entities/user.entity';
import { Race } from './race.service';

@Injectable()
export class RaceEvents {
  createdRace(socket: Socket, race: Race) {
    socket.join(race.id);
    socket.emit('race_joined', race);
    socket.emit('challenge_selected', race.challenge);
  }

  joinedRace(socket: Socket, race: Race, user: User) {
    socket.join(race.id);
    socket.emit('race_joined', race);
    socket.emit('challenge_selected', race.challenge);
    socket.to(race.id).emit('member_joined', race.members[user.id]);
  }

  raceDoesNotExist(socket: Socket, id: string) {
    socket.emit('race_does_not_exist', id);
  }
}
