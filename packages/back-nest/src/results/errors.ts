import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class SaveResultAnonymousNotAllowed extends ForbiddenException {
  constructor() {
    super('Anonymous users cannot save results');
  }
}

export class SaveResultInvalidUserID extends ForbiddenException {
  constructor() {
    super('Users can only save their own results');
  }
}

export class SaveResultRaceNotCompleted extends BadRequestException {
  constructor() {
    super('User did not complete the race');
  }
}

export class SaveResultUserNotInRace extends BadRequestException {
  constructor() {
    super('User is not playing in the race');
  }
}
