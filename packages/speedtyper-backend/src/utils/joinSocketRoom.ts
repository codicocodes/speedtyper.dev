import UserRaceState from "../UserRaceState";
import Race from "../Race";

export default (
  socket: SocketIO.Socket,
  userRaceData: UserRaceState,
  race: Race
) => {
  console.log("Joining socket room: ", race.id);
  socket.join(race.id, () => {
    console.log("Joined socked room: ", race.id);

    socket.emit("race_joined", {
      ...race.toObject(),
      selectedUserId: userRaceData.id,
      currentUserId: userRaceData.id,
    }); // emitting to only the specific socket user

    socket.to(race.id).emit("user_joined", userRaceData.toObject()); // sending to all members in room except sender
    console.log("Successfully emitted events after joining the socket room.");
  });
};
