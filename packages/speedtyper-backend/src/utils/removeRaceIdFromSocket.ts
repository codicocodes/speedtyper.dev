export default (socket: SocketIO.Socket): void => {
  if (socket?.handshake?.session?.raceId) {
    delete socket.handshake.session.raceId;
  }
};
