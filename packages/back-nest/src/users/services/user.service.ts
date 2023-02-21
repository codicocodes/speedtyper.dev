import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async upsertGithubUser(userData: User): Promise<User> {
    const currentUser = await this.userRepository.findOneBy({
      githubId: userData.githubId,
    });
    userData.id = currentUser?.id;
    userData.banned = currentUser?.banned || userData.banned || false;
    const user = await this.userRepository.save(userData);
    user.isAnonymous = false;
    return user;
  }

  async findByLegacyID(legacyId: string) {
    const user = await this.userRepository.findOneBy({
      legacyId,
    });
    return user;
  }
}
