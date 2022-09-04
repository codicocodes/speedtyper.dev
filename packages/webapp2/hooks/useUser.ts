import { useEffect, useState } from "react";
import getConfig from "next/config";
import ky from "ky-universal";

import { IUser } from "../types/";

const useUser = () => {
  const {publicRuntimeConfig: {  serverUrl } } = getConfig()
  const [user, setUser] = useState(null);

  useEffect(() => {
    ky.get(`${serverUrl}/me`, { credentials: "include" })
    .json()
    .then((userData) => {
      setUser(userData);
    }).catch(e => {
      console.log({e})
    });
  }, []);

  const logout = () => {
    setUser(null);
    ky.get(`${serverUrl}/me`, { credentials: "include" })
    .json()
    .then((userData) => {
      setUser(userData);
    });
  };

  return [user, logout] as [IUser | null, () => {}];
}

export default useUser;
