import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  @Get()
  getCurrentUser(@Req() request: Request): User {
    return request.session.user;
  }
}
