import { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import ky from "ky-universal";

export default () => {
  const { serverUrl } = useSiteData();
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
