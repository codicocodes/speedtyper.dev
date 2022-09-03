import { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import ky from "ky-universal";

export default () => {
  const { serverUrl } = useSiteData();
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
