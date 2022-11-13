import SocketLatest from "../../../common/services/Socket";
import { KeyStroke } from "../state/code-store";
import { RacePlayer, useGameStore } from "../state/game-store";

export class Game {
  constructor(private socket: SocketLatest) {
    this.initializeConnectedState(socket);
    this.listenForRaceJoined();
    this.listenForMemberJoined();
    this.listenForProgressUpdated();
    this.listenForRaceDoesNotExist();
    this.listenForDisconnect();
  }

  get id() {
    return useGameStore.getState().id;
  }

  get progress() {
    return Object.values(useGameStore.getState().members);
  }

  sendKeyStroke(keyStroke: KeyStroke) {
    this.socket.emit("key_stroke", keyStroke);
  }

  next() {
    this.socket.emit("refresh_challenge");
  }

  join(id: string) {
    this.socket.emit("join", id);
  }

  play() {
    this.socket.emit("play");
  }

  private listenForRaceJoined() {
    this.socket.subscribe("race_joined", (_, race) => {
      console.log("race_joined", race);
      useGameStore.setState((game) => ({
        id: race.id,
        owner: race.owner,
        members: race.members,
        count: game.count + 1,
      }));
    });
  }

  private listenForMemberJoined() {
    this.socket.subscribe("member_joined", (_, member) => {
      console.log("member_joined", member);
      this.updateMemberInState(member);
    });
  }

  private listenForProgressUpdated() {
    this.socket.subscribe("progress_updated", (_, member: RacePlayer) => {
      this.updateMemberInState(member);
    });
  }

  private updateMemberInState(member: RacePlayer) {
    useGameStore.setState((game) => {
      const members = game.members;
      members[member.id] = member;
      return {
        ...game,
        members,
        count: game.count + 1,
      };
    });
  }

  private listenForRaceDoesNotExist() {
    this.socket.subscribe("race_does_not_exist", (_, id) => {
      console.log("race_does_not_exist", id);
      // TODO: this should be handled different in the future
      // because this could abruptly stops the gameplay for the user if they are in the middle of a race
      // we probably want to show a warning about being disconnected from the race
      // without stopping the user from typing
      // and allowing them to finnish typing if they want to
      this.join(id);
    });
  }

  private listenForDisconnect() {
    this.socket.subscribe("disconnect", (_, data) => {
      useGameStore.setState((game) => {
        return {
          ...game,
          connected: false,
        };
      });
    });
  }
  private initializeConnectedState(socket: SocketLatest) {
    const connected = socket.socket.connected;
    useGameStore.setState((game) => {
      return {
        ...game,
        connected,
      };
    });
  }
}
