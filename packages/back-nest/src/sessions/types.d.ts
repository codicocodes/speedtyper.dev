import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

declare module 'http' {
  interface IncomingMessage {
    cookieHolder?: string;
    session: Session & SessionData;
  }
}
