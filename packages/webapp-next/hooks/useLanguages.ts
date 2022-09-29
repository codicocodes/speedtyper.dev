import { useEffect, useState } from "react";
import ky from "ky-universal";
import getConfig from "next/config";

export default () => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    ky.get(`${serverUrl}/languages`)
      .json()
      .then((languageData) => {
        setLanguages(languageData as string[]);
      });
  }, [serverUrl]);

  return languages;
};
