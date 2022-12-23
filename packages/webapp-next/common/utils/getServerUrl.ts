import getConfig from "next/config";

export function getSiteRoot() {
  const {
    publicRuntimeConfig: { siteRoot },
  } = getConfig();
  return siteRoot;
}

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
