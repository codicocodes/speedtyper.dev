import io from "socket.io-client";

export default class Socket {
  socket: SocketIOClient.Socket;

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);
  }

  disconnect = () => {
    this.socket.emit("disconnect");
    if (this.socket) this.socket.disconnect();
  };

  subscribe = (event: string, cb: (error: string, msg: any) => {}) => {
    if (!this.socket) return true;
    this.socket.on(event, (msg: any) => {
      // console.log("Websocket event received!", event, msg);
      return cb(null, msg);
    });
  };

  emit = (event: string, data?: any) => {
    if (this.socket) this.socket.emit(event, data);
  };
}
