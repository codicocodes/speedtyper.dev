import { Request } from "express";

const getInternalToken = () => {
  const internalToken = process.env.INTERNAL_API_TOKEN;
  if (!internalToken) {
    throw new Error("unauthorized");
  }
  return internalToken;
};

const API_TOKEN_KEY = "api-token";

const getApiToken = (request: Request) => {
  const token = request.headers[API_TOKEN_KEY];
  return token;
};

export const validateApiToken = (request: Request) => {
  const internalToken = getInternalToken();
  const providedToken = getApiToken(request);
  if (providedToken !== internalToken) {
    throw new Error("unauthorized");
  }
};
