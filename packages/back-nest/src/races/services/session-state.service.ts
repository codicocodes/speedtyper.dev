import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionState {
  getUser(socket: Socket): User {
    return socket.request.session.user;
  }

  getRaceID(socket: Socket): string {
    return socket.request.session.raceId;
  }

  saveRaceID(socket: Socket, id: string) {
    socket.leave(socket.request.session.raceId);
    socket.request.session.raceId = id;
  }

  removeRaceID(socket: Socket) {
    socket.leave(socket.request.session.raceId);
    socket.request.session.raceId = null;
  }
}
