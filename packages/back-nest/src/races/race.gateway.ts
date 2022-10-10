import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export const options = {
  cors: {
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
@WebSocketGateway(options)
export class RaceGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.info('Websocket Server Started.');
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  @SubscribeMessage('play')
  handlePlay(socket: Socket): void {
    const req = socket.request;
    const user = req.session.user;
    console.log('playeroni', socket.id, user);
    return user;
  }
}
