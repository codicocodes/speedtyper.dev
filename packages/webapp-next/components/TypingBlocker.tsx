import React from "react";

const TypingBlocker = (): JSX.Element => {
  return (
    <div className="absolute bg-red-500 p-4 z-10 left-1/2 transform -translate-x-1/2 shadow-xl rounded-lg">
      <div className=" text-dark-ocean tracking-wider">
        <span className="text-lg font-semibold flex justify-center items-center">
          Delete your mistakes to continue
        </span>
      </div>
    </div>
  );
};

export default TypingBlocker;
