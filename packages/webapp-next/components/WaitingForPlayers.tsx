import React from "react";

const WaitingForPlayers = () => {
  return (
    <div className="flex w-full">
      <div className="inline lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="flex items-center">
        <div className="text-xl text-off-white tracking-wider ml-6">
          Waiting for players to join
        </div>
      </div>
    </div>
  );
};

export default WaitingForPlayers;
