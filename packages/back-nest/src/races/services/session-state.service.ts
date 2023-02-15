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
    const prevRaceID = socket.request.session.raceId;
    socket.request.session.raceId = id;
    socket.request.session.save(() => {
      socket.leave(prevRaceID);
    });
  }

  removeRaceID(socket: Socket) {
    const prevRaceID = socket.request.session.raceId;
    socket.request.session.raceId = null;
    socket.request.session.save(() => {
      socket.leave(prevRaceID);
    });
  }
}
