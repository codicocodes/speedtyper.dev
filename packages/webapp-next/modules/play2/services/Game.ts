import { addIDtoQueryParams } from "../../../common/utils/router";
import Socket from "../../../Socket";

export class Game {
  constructor(private socket: Socket) {
    this.socket.subscribe("race_joined", (_, data) => {
      // TODO: all the data we want is: roomID, members[]
      addIDtoQueryParams(data.id);
    });
  }
  next = () => {
    this.socket.emit("refresh_challenge");
  };

  play = () => {
    this.socket.emit("play", { mode: "private" });
  };
}
