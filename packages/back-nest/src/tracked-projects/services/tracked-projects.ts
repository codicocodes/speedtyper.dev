import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackedProject } from '../tracked-project.entity';

@Injectable()
export class TrackedProjectsService {
  constructor(
    @InjectRepository(TrackedProject)
    private trackedProjects: Repository<TrackedProject>,
  ) {}

  async bulkUpsert(names: string[]): Promise<void> {
    const partialProjects = names.map((fullName) => ({ fullName }));
    await this.trackedProjects.upsert(partialProjects, ['fullName']);
  }
}
