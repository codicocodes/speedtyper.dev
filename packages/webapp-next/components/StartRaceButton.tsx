import React from "react";
import { useKeyMap } from "../hooks/useKeyMap";
import Socket from "../Socket";
import Button from "../common/components/Button";

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

  useKeyMap(!disabled, "Enter", handleOnClick);

  return (
    <Button
      color="secondary"
      disabled={disabled}
      onClick={handleOnClick}
      title="Start the match"
      text="Start"
    />
  );
};
export default StartRaceButton;
