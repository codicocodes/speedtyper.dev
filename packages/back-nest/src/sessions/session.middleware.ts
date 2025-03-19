import { TypeormStore } from 'connect-typeorm/out';
import session from 'express-session';
import { PostgresDataSource } from 'src/database.module';
import { Session } from './session.entity';
import { RequestHandler } from '@nestjs/common/interfaces';

const SESSION_SECRET_MIN_LENGTH = 32;

const ONE_DAY = 1000 * 60 * 60 * 24;

export const cookieName = 'speedtyper-v2-sid';

export const getSessionMiddleware = (): RequestHandler => {
  const sessionRepository = PostgresDataSource.getRepository(Session);
  return session({
    name: cookieName,
    store: new TypeormStore({
      cleanupLimit: 2,
    }).connect(sessionRepository),
    secret: getSessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: ONE_DAY * 7,
      ...(process.env.NODE_ENV === 'production'
        ? {
            domain: '.speedtyper.dev',
          }
        : {}),
    },
  });
};

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
