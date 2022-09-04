import { useEffect, useState } from "react";
import ky from "ky-universal";

export default () => {
  const serverUrl = process.env.serverUrl
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    ky.get(`${serverUrl}/languages`)
      .json()
      .then((languageData) => {
        setLanguages(languageData as string[]);
      });
  }, []);

  return languages;
};
