import RaceManager, { IJoinGameArgs } from "../RaceManager";
import onChallengeStarted, {
  onChallengeStartedArgs,
} from "./onChallengeStarted";

export default (raceManager: RaceManager) => (socket: SocketIO.Socket) => {
  return;
  const playHandler = (gameArgs: IJoinGameArgs) => {
    raceManager.play(socket, gameArgs);
  };

  const challengeStartedHandler = (data: onChallengeStartedArgs) =>
    onChallengeStarted(data);

  const disconnectHandler = () => raceManager.onDisconnect(socket);

  const refreshHandler = (language: string | null) =>
    raceManager.onRefreshChallenge(socket, language);

  const inputChangeHandler = (pressedKey: string) =>
    raceManager.onInputChange(socket, pressedKey);

  const backspacePressHandler = () => raceManager.onBackspacePress(socket);

  const startRaceCommandHandler = () => raceManager.onStartRaceCommand(socket);

  socket.on("play", playHandler);
  socket.on("disconnect", disconnectHandler);
  socket.on("refresh_challenge", refreshHandler);
  socket.on("input_change", inputChangeHandler);
  socket.on("backspace_press", backspacePressHandler);
  socket.on("start_race_command", startRaceCommandHandler);
  socket.on("challenge_started", challengeStartedHandler);
};
