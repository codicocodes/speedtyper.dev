import React, {useEffect} from "react";
import Socket from "../Socket";

const StartRaceButton = ({
  socket,
  gameId,
  countdown,
  startTime,
  loaded,
}: {
  socket: Socket | null;
  gameId: string;
  countdown: number;
  startTime?: number;
  loaded: boolean;
}) => {
  const disabled = !loaded || !!countdown || !!startTime;

  const handleOnClick = () => {
    socket?.emit("start_race_command", { gameId });
  };

  return (
    <button
      disabled={disabled}
      className={`flex my-4 items-center ${
        disabled ? "" : "hover:bg-purple-300"
      } bg-purple-400 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } py-2 px-4 ml-4 rounded shadow-2xl border-gray-200 border`}
      onClick={handleOnClick}
    >
      Start
    </button>
  );
}
export default StartRaceButton;
