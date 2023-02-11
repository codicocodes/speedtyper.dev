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

  async getRaceID(socket: Socket) {
    return new Promise<string>((resolve) => {
      socket.request.session.reload(() => {
        resolve(socket.request.session.raceId);
      });
    });
  }

  async saveRaceID(socket: Socket, id: string) {
    return new Promise<void>((resolve) => {
      socket.request.session.raceId = id;
      socket.request.session.save(() => {
        resolve();
      });
    });
  }

  async removeRaceID(socket: Socket) {
    const raceID = socket.request.session.raceId;
    await socket.leave(raceID);
    return new Promise<void>(async (resolve) => {
      socket.request.session.raceId = null;
      socket.request.session.save(() => {
        resolve();
      });
    });
  }
}
