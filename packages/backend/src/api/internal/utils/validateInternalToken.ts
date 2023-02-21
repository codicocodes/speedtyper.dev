import { Request } from "express";

const getInternalToken = () => {
  const internalToken = process.env.INTERNAL_TOKEN;
  if (!internalToken) {
    throw new Error("unauthorized");
  }
  return internalToken;
};

const API_TOKEN_KEY = "Api-Token";

const getApiToken = (request: Request) => {
  const token = request.headers[API_TOKEN_KEY];
  return token;
};

export const validateApiToken = (request: Request) => {
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.AVOID_INTERNAL_TOKEN === "true"
  )
    return;

  const internalToken = getInternalToken();
  const providedToken = getApiToken(request);
  if (providedToken !== internalToken) {
    throw new Error("unauthorized");
  }
};
