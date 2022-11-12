import getConfig from "next/config";

export function getServerUrl() {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  return serverUrl;
}

export function getExperimentalServerUrl() {
  const {
    publicRuntimeConfig: { experimentalServerUrl },
  } = getConfig();
  return experimentalServerUrl;
}
