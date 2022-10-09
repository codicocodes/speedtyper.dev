import * as session from 'express-session';
import { User } from 'src/users/entities/user.entity';

const MIN_SECRET_LENGTH = 18;

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

export const sessionMiddleware = session({
  secret: getSessionSecret(),
  resave: false,
  saveUninitialized: false,
});

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret)
    throw new Error(`SESSION_SECRET missing in environment variables.`);
  if (secret.length < MIN_SECRET_LENGTH)
    throw new Error(
      `Invalid SESSION_SECRET in environment variables. Min length is ${MIN_SECRET_LENGTH}`,
    );

  return secret;
}
