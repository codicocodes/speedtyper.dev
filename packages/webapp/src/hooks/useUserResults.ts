import { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import ky from "ky-universal";

export default (userName: string): any => {
  const { serverUrl } = useSiteData();
  const [userResults, setUserResults] = useState(null);

  useEffect(() => {
    ky.get(`${serverUrl}/users/${userName}/results`, { credentials: "include" })
      .json()
      .then((userData) => {
        setUserResults(userData as any);
      });
  }, []);

  return userResults;
};
