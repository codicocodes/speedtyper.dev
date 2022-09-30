import getConfig from "next/config";

export function getServerUrl() {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  return serverUrl;
}
