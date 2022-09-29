import React from "react";

const TypingErrorMessage = (): JSX.Element => {
  return (
    <div className="flex w-full bg-red-400 shadow-2xl justify-center items-center my-4 py-2 text-lg  font-light">
      <span className="h-10 flex flex-row justify-center items-center text-xl tracking-wide font-semibold text-dark-ocean">
        Delete your mistakes to continue...
      </span>
    </div>
  );
};

export default TypingErrorMessage;
