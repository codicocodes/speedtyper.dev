import React, { useEffect, useRef } from "react";
import Socket from "../Socket";
import { IAction } from "../types";

const renderSvg = (isCompleted: boolean) => {
  return isCompleted ? (
    <svg viewBox="0 0 24 24" className="h-5 fill-current mr-2">
      <g>
        <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
      </g>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 fill-current mr-2">
      <g>
        <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
      </g>
    </svg>
  );
};

export default ({
  socket,
  isCompleted,
  focusCodeArea,
  language,
  mode,
  gameId,
  dispatch,
}: {
  socket?: Socket;
  isCompleted?: boolean;
  focusCodeArea: boolean;
  language: string | null;
  mode: string | null;
  gameId: string | null;
  dispatch: React.Dispatch<IAction>;
}) => {
  const handleOnClick = () => {
    dispatch({ type: "reset_state" });
    if (!mode || mode === "multiplayer") {
      socket.emit("play", { language, mode, gameId });
    } else {
      socket.emit("refresh_challenge", language);
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    if (!focusCodeArea) {
      ref.current.focus();
    }
  }, [focusCodeArea]);

  return (
    <button
      className="flex items-center py-2 px-4 hover:bg-purple-300 cursor-pointer bg-purple-400 my-4 rounded shadow-2xl border-gray-200 border"
      onClick={handleOnClick}
      ref={ref}
    >
      {renderSvg(isCompleted)}
      Next
    </button>
  );
};
