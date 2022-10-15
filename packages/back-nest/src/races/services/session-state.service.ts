import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SessionState {
  getUser(socket: Socket) {
    return socket.request.session.user;
  }

  getRaceID(socket: Socket) {
    return socket.request.session.raceId;
  }

  saveRaceID(socket: Socket, id: string) {
    socket.request.session.raceId = id;
    socket.request.session.save();
  }

  removeRaceID(socket: Socket) {
    socket.request.session.raceId = null;
    socket.request.session.save();
  }
}
