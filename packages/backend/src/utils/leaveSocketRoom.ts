export default (socket: SocketIO.Socket, userId: string, raceId: string) => {
  console.log("Leaving socket room: ", raceId);
  socket.leave(raceId, () => {
    console.log(`User left socket room: `, { userId, raceId });

    socket.to(raceId).emit("user_left", userId); // sending to all members in room except sender
    console.log("Successfully emitted events after joining the socket room.");
  });
};
