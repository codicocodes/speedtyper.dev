import { connect, Socket as SocketIOSocket } from "socketio-latest";

export default class SocketLatest {
  socket?: SocketIOSocket;

  constructor(private serverUrl: string) {}
  connect() {
    this.socket = connect(this.serverUrl, {
      withCredentials: true,
      reconnection: true,
    });
    this.socket.on("disconnect", (err) => {
      console.log("disconnected from server", err);
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  subscribe(event: string, cb: (error: string | null, msg: any) => void) {
    if (!this.socket) return true;
    this.socket.on(event, (msg: any) => {
      return cb(null, msg);
    });
  }

  emit(event: string, data?: any) {
    if (this.socket) this.socket.emit(event, data);
  }
}
