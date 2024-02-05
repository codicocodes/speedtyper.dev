import { Controller, Get, HttpException, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  @Get()
  getCurrentUser(@Req() request: Request): User {
    if (!request.session?.user) {
      throw new HttpException('Internal server error', 500);
    }
    return request.session.user;
  }
}
