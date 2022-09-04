import { useEffect, useState } from "react";
import ky from "ky-universal";
import getConfig from "next/config";

const usePlayers =() => {
  const {publicRuntimeConfig: { serverUrl } } = getConfig()
  const [players, setPlayers] = useState({ connected: 0, loading: true });

  useEffect(() => {
    ky.get(`${serverUrl}/connected`)
      .json()
      .then(({ connected }) => {
        setPlayers({ connected, loading: false });
      });
  }, []);

  return players;
};

export default usePlayers;
