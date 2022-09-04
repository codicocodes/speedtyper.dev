import React, { useEffect } from "react";
import Socket from "../Socket";
import { IAction } from "../../types";

export default ({
  startTime,
  isCompleted,
  blockTyping,
  input,
  dispatch,
  codeInputRef,
  hasMistake,
  setInputIsSelected,
  socket,
}: {
  input: string;
  dispatch: React.Dispatch<IAction>;
  codeInputRef: React.MutableRefObject<any>;
  isCompleted: boolean;
  hasMistake: boolean;
  blockTyping: boolean;
  setInputIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  startTime?: number;
}) => {
  const isDeleteAction = (inputString: string) => {
    return input.length > inputString.length;
  };

  useEffect(() => {
    if (startTime) {
      codeInputRef.current.focus();
    }
  }, [startTime]);

  return (
    <input
      ref={codeInputRef}
      disabled={isCompleted}
      onKeyUp={(e) => {
        if (!blockTyping) {
          const { key } = e;
          const { code } = e.nativeEvent;
          const time = new Date().getTime();
          dispatch({ type: "key_up", payload: { key, code, time } });
          socket.emit("key_up", { key, code, time });
        }
      }}
      onKeyPress={(e) => {
        const { key } = e;
        if (key === "Enter" && !blockTyping) {
          dispatch({ type: "input_change", payload: "Enter" });
          socket.emit("input_change", "Enter");
        }
      }}
      onChange={(e) => {
        const inputString = e.target.value;

        if (!isDeleteAction(inputString) && !blockTyping) {
          const pressedKey = inputString[inputString.length - 1];
          dispatch({ type: "input_change", payload: pressedKey });
          socket.emit("input_change", pressedKey);
        } else if (isDeleteAction(inputString)) {
          dispatch({ type: "backspace_press" });
          socket.emit("backspace_press");
        }
      }}
      autoFocus
      autoComplete="off"
      onPaste={(e) => e.preventDefault()}
      value={input.replace(/\n/g, " ").replace(/\`/g, " ")} // Required because \n triggers a backspace event if it's in the input because it's automatically removed
      className={`${
        hasMistake ? "bg-red-300" : "bg-off-white"
      } block w-full text-sm p-2 mt-3 mb-1 placeholder-dark-ocean text-dark-ocean`}
      id="code-input"
      type="text"
      placeholder="Start coding..."
      style={{
        position: "absolute",
        width: "1px",
        left: "-10000px",
      }}
      onFocus={() => {
        setInputIsSelected(true);
      }}
      onBlur={() => {
        setInputIsSelected(false);
      }}
    />
  );
};
