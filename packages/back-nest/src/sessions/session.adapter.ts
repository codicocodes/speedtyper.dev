import { IncomingMessage } from 'http';
import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { Server, Socket } from 'socket.io';

type SocketIOCompatibleMiddleware = (
  r: IncomingMessage,
  object: object,
  next: NextFunction,
) => void;

export function makeSocketIOReadMiddleware(
  middleware: SocketIOCompatibleMiddleware,
) {
  return (socket: Socket, next: NextFunction) => {
    return middleware(socket.request, {}, next);
  };
}

export const denyWithoutUserInSession = (
  socket: Socket,
  next: NextFunction,
) => {
  if (!socket.request.session.user) {
    console.log(
      'disconnect because there is no user in the session',
      socket.id,
    );
    return socket.disconnect(true);
  }
  next();
};

export class SessionAdapter extends IoAdapter {
  constructor(
    app: INestApplication,
    private sessionMiddleware: SocketIOCompatibleMiddleware,
  ) {
    super(app);
  }

  createIOServer(port: number, opt?: any): any {
    const server: Server = super.createIOServer(port, opt);
    server.use(makeSocketIOReadMiddleware(this.sessionMiddleware));
    server.use(denyWithoutUserInSession);
    return server;
  }
}
