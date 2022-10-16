import { Session, SessionData } from 'express-session';
import { User } from 'src/users/entities/user.entity';

declare module 'express-session' {
  export interface SessionData {
    user: User;
    raceId: string;
  }
}

declare module 'http' {
  interface IncomingMessage {
    cookieHolder?: string;
    session: Session & SessionData;
  }
}
