import React, { useState } from "react";
import ky from "ky-universal";
import { toast } from "react-toastify";
import getConfig from "next/config";
import Button from "../common/components/Button";
import { DiscordLogo } from "../assets/icons";

const PingDiscordButton = ({ gameId }: { gameId: string }) => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const [pinged, setPinged] = useState(false);

  const onClickHandler = () => {
    if (!pinged) {
      ky.post(`${serverUrl}/races/${gameId}/share`, { credentials: "include" });
      toast.dark("Pinged the discord");
      setPinged(true);
    }
  };

  return (
    <Button
      color="secondary"
      leftIcon={<DiscordLogo />}
      disabled={pinged}
      onClick={onClickHandler}
      title="Ping"
      text="Ping"
    />
  );
};

export default PingDiscordButton;
