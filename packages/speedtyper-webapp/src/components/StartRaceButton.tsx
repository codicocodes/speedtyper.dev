import React, {useRef, useEffect} from "react";
import Socket from "../Socket";

export default ({
  socket,
  gameId,
  countdown,
  startTime,
  focused,
  loaded,
}: {
  socket?: Socket;
  gameId: string;
  countdown: number;
  startTime?: number;
  focused: boolean;
  loaded: boolean;
}) => {
  const disabled = !loaded || !!countdown || !!startTime;

  const handleOnClick = () => {
    socket.emit("start_race_command", { gameId });
  };

  const ref = useRef(null);

  useEffect(() => {
    if (focused) {
      ref.current.focus();
    }
  }, [focused]);

  return (
    <button
      ref={ref}
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
};
