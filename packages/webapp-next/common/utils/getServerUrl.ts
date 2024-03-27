import { publicRuntimeConfig } from "../../next.config";

export function getSiteRoot() {
  return publicRuntimeConfig?.siteRoot;
}

export function getServerUrl() {
  return publicRuntimeConfig?.serverUrl;
}

export function getExperimentalServerUrl() {
  return publicRuntimeConfig?.experimentalServerUrl;
}
