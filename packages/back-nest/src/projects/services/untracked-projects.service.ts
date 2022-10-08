import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UntrackedProject } from '../entities/untracked-project.entity';

@Injectable()
export class UntrackedProjectService {
  constructor(
    @InjectRepository(UntrackedProject)
    private trackedProjects: Repository<UntrackedProject>,
  ) {}

  async bulkUpsert(names: string[]): Promise<void> {
    const partialProjects = names.map((fullName) => ({ fullName }));
    await this.trackedProjects.upsert(partialProjects, ['fullName']);
  }
  async findAll(): Promise<UntrackedProject[]> {
    return await this.trackedProjects.find();
  }
}
