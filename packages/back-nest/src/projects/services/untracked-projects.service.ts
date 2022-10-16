import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UntrackedProject } from '../entities/untracked-project.entity';

@Injectable()
export class UntrackedProjectService {
  constructor(
    @InjectRepository(UntrackedProject)
    private untrackedProjects: Repository<UntrackedProject>,
  ) {}

  async bulkUpsert(names: string[]): Promise<void> {
    const partialProjects = names.map((fullName) => ({ fullName }));
    await this.untrackedProjects.upsert(partialProjects, ['fullName']);
  }

  async remove(untrackedProjects: UntrackedProject[]): Promise<void> {
    await this.untrackedProjects.remove(untrackedProjects);
  }

  async findAll(): Promise<UntrackedProject[]> {
    return await this.untrackedProjects.find();
  }
}
