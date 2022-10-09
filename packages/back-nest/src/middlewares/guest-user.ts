import { NextFunction, Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';

export function guestUserMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  if (!req.session.user) {
    req.session.user = User.generateAnonymousUser();
  }
  next();
}
