import { useEffect, useState } from "react";
import getConfig from "next/config";
import ky from "ky-universal";

import { IUser } from "../types/";

const useUser = () => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    ky.get(`${serverUrl}/me`, { credentials: "include" })
      .json()
      .then((userData) => {
        setUser(userData as IUser);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, [serverUrl]);

  const logout = () => {
    setUser(null);
  };

  return [user, logout] as [IUser | null, () => {}];
};

export default useUser;
