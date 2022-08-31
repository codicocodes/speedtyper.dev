import { useState, useEffect } from "react";

export default () => {
  const [params, setParams] = useState({
    id: "",
    mode: "",
    loading: true,
  });

  useEffect(() => {
    if (typeof document !== "undefined" && window) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id") ?? null;
      const mode = urlParams.get("mode") ?? null;

      setParams({ id, mode, loading: false });
    }
  }, []);

  return params;
};
