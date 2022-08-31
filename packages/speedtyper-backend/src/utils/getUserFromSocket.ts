import createGuestUser from "./createGuestUser";

export default (socket: SocketIO.Socket) => {
  let user = socket?.handshake?.session?.user;
  if (!user) {
    user = createGuestUser();
    if (socket.handshake.session) {
      socket.handshake.session.user = user;
    } else {
      console.log("there is no handshake.session on the socket monkaHmm");
    }
  }

  return user;
};
