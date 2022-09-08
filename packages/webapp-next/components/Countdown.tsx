import React from "react";

const Countdown = ({ countdown }: { countdown: number }) => {
  const renderedString = countdown === 0 ? "START TYPING" : countdown;
  return countdown === 0 ? null : (
    <div className="absolute py-4 px-8 z-10 left-1/2 transform -translate-x-1/2 bg-dark-ocean shadow-xl rounded-lg">
      <div className="flex flex-grow items-center justify-center">
        <div className="text-5xl text-off-white tracking-wider">
          {renderedString}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
