import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionState {
  async getUser(socket: Socket) {
    return new Promise<User>((resolve) => {
      socket.request.session.reload(() => {
        resolve(socket.request.session.user);
      });
    });
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
