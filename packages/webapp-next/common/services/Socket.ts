import { io, Socket as SocketIOSocket } from "socketio-latest";

export default class SocketLatest {
  socket: SocketIOSocket;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl, { withCredentials: true });
  }

  disconnect = () => {
    this.socket.emit("disconnect");
    if (this.socket) this.socket.disconnect();
  };

  subscribe = (event: string, cb: (error: string | null, msg: any) => void) => {
    if (!this.socket) return true;
    this.socket.on(event, (msg: any) => {
      return cb(null, msg);
    });
  };

  emit = (event: string, data?: any) => {
    if (this.socket) this.socket.emit(event, data);
  };
}
