import { useEffect, useState } from "react";
import ky from "ky-universal";

export default () => {
  const serverUrl = process.env.serverUrl
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
