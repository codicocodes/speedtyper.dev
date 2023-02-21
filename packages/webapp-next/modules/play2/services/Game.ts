import SocketLatest from "../../../common/services/Socket";
import { useUserStore } from "../../../common/state/user-store";
import { KeyStroke, useCodeStore } from "../state/code-store";
import { useConnectionStore } from "../state/connection-store";
import { RacePlayer, RaceResult, useGameStore } from "../state/game-store";
import { useSettingsStore } from "../state/settings-store";

export class Game {
  onConnectHasRun: boolean;
  onConnect(raceId?: string) {
    this.socket.socket.on("connect", () => {
      if (this.onConnectHasRun) return;
      console.log("registering all the things");
      this.listenForRaceJoined();
      this.listenForRaceStarted();
      this.listenForMemberJoined();
      this.listenForCountdown();
      this.listenForMemberLeft();
      this.listenForProgressUpdated();
      this.listenForRaceCompleted();
      this.listenForRaceDoesNotExist();
      this.listenForDisconnect();
      this.socket.subscribe("challenge_selected", (_) => {
        useGameStore.setState((game) => {
          return {
            ...game,
            results: {},
            myResult: undefined,
          };
        });
      });
      if (!raceId) {
        this.play();
      } else if (this.id !== raceId) {
        this.join(raceId);
      }
      this.onConnectHasRun = true;
    });
  }
  constructor(private socket: SocketLatest, raceId?: string) {
    this.initializeConnectedState(socket);
    this.onConnectHasRun = false;
    this.onConnect(raceId);
  }

  reconnect() {
    this.socket.socket.disconnect();
    this.socket.socket.connect();
    this.join(this.id ?? "");
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
    const connectedToValidRace =
      useConnectionStore.getState().raceExistsInServer;
    if (connectedToValidRace) {
      const language = useSettingsStore.getState().languageSelected?.language;
      const dto = { language };
      this.socket.emit("refresh_challenge", dto);
    } else {
      this.play();
    }
  }

  join(id: string) {
    this.socket.emit("join", id);
  }

  play() {
    const language = useSettingsStore.getState().languageSelected?.language;
    const dto = { language };
    this.socket.emit("play", dto);
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
      useConnectionStore.setState((s) => ({ ...s, isConnected: true }));
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
      useSettingsStore.setState((s) => ({ ...s, raceIsPublic: race.isPublic }));
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
    this.socket.subscribe("member_left", (_, { member, owner }) => {
      useGameStore.setState((game) => {
        const members = { ...game.members };
        delete members[member];
        return {
          ...game,
          owner,
          members,
        };
      });
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

  private leaveRace(userId: string) {}

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
