import { useEffect, useState } from "react";
import ky from "ky-universal";

import { IUser } from "../../types/";

export default () => {
  const serverUrl = process.env.serverUrl
  const [user, setUser] = useState(null);

  useEffect(() => {
    ky.get(`${serverUrl}/me`, { credentials: "include" })
      .json()
      .then((userData) => {
        setUser(userData);
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
};
