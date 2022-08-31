export default (socket: SocketIO.Socket): string | null => {
  return socket?.handshake?.session?.raceId ?? null;
};
