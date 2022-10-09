import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session';
import { PostgresDataSource } from 'src/database.module';
import { User } from 'src/users/entities/user.entity';
import { Session } from './session.entity';

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

export const sessionMiddleware = () => {
  const sessionRepository = PostgresDataSource.getRepository(Session);
  return session({
    store: new TypeormStore().connect(sessionRepository),
    secret: getSessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
    },
  });
};

const SESSION_SECRET_MIN_LENGTH = 12;

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret)
    throw new Error('SESSION_SECRET is missing from environment variables');
  if (secret.length < SESSION_SECRET_MIN_LENGTH)
    throw new Error(
      `SESSION_SECRET is not long enough, must be at least ${SESSION_SECRET_MIN_LENGTH} characters long`,
    );
  return secret;
}
