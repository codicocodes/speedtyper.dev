import SocketLatest from "../../../common/services/Socket";
import { useUserStore } from "../../../common/state/user-store";
import { KeyStroke, useCodeStore } from "../state/code-store";
import { useConnectionStore } from "../state/connection-store";
import { RacePlayer, RaceResult, useGameStore } from "../state/game-store";

export class Game {
  constructor(private socket: SocketLatest) {
    this.initializeConnectedState(socket);
    this.listenForRaceJoined();
    this.listenForRaceStarted();
    this.listenForMemberJoined();
    this.listenForCountdown();
    this.listenForMemberLeft();
    this.listenForProgressUpdated();
    this.listenForRaceCompleted();
    this.listenForRaceDoesNotExist();
    this.listenForDisconnect();
    this.socket.subscribe("challenge_selected", () => {
      useGameStore.setState((game) => {
        return {
          ...game,
          results: {},
          myResult: undefined,
        };
      });
    });
  }

  get id() {
    return useGameStore.getState().id;
  }

  start() {
    this.socket.emit("start_race");
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

  private listenForRaceStarted() {
    this.socket.subscribe("race_started", (_, time: string) => {
      useCodeStore.setState((codeState) => ({
        ...codeState,
        startTime: new Date(time),
      }));
      useGameStore.setState((state) => ({
        ...state,
        countdown: undefined,
      }));
    });
  }

  private listenForRaceJoined() {
    this.socket.subscribe("race_joined", (_, race) => {
      console.log("race_joined", race);
      useGameStore.setState((game) => ({
        ...game,
        id: race.id,
        owner: race.owner,
        members: race.members,
        countdown: undefined,
      }));
      useConnectionStore.setState((state) => ({
        ...state,
        raceExistsInServer: true,
      }));
    });
  }

  private listenForCountdown() {
    this.socket.subscribe("countdown", (_, countdown: number) => {
      useGameStore.setState((state) => ({
        ...state,
        countdown,
      }));
    });
  }

  private listenForMemberJoined() {
    this.socket.subscribe("member_joined", (_, member: RacePlayer) => {
      console.log("member_joined", member);
      this.updateMemberInState(member);
    });
  }

  private listenForMemberLeft() {
    this.socket.subscribe("member_left", (_, userId: string) => {
      console.log("member_left", { userId });
      this.leaveRace(userId);
    });
  }

  private listenForProgressUpdated() {
    this.socket.subscribe("progress_updated", (_, member: RacePlayer) => {
      this.updateMemberInState(member);
    });
  }

  private listenForRaceCompleted() {
    this.socket.subscribe("race_completed", (_, result: RaceResult) => {
      const userId = useUserStore.getState().id;
      const isMyResult = userId === result.user.id;
      useGameStore.setState((game) => {
        const results = {
          ...game.results,
          [result.user.id]: result,
        };
        return {
          ...game,
          results,
          myResult: isMyResult ? result : game.myResult,
        };
      });
    });
  }

  private updateMemberInState(member: RacePlayer) {
    useGameStore.setState((game) => {
      const members = { ...game.members };
      members[member.id] = member;
      return {
        ...game,
        members,
      };
    });
  }

  private leaveRace(userId: string) {
    useGameStore.setState((game) => {
      const members = { ...game.members };
      delete members[userId];
      return {
        ...game,
        members,
      };
    });
  }

  private listenForRaceDoesNotExist() {
    this.socket.subscribe("race_does_not_exist", (_, id) => {
      console.log("race_does_not_exist", id);
      useConnectionStore.setState((state) => ({
        ...state,
        raceExistsInServer: false,
      }));
    });
  }

  private listenForDisconnect() {
    this.socket.subscribe("disconnect", (_, _data) => {
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
        game: this,
      };
    });
  }
}
