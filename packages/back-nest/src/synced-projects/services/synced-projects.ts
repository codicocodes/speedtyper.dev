import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SyncedProject } from '../synced-project.entity';

@Injectable()
export class SyncedProjectsService {
  constructor(
    @InjectRepository(SyncedProject)
    private syncedProjects: Repository<SyncedProject>,
  ) {}

  async bulkUpsert(projects: SyncedProject[]): Promise<void> {
    await this.syncedProjects.upsert(projects, ['fullName']);
  }

  async findAll(): Promise<SyncedProject[]> {
    const projects = await this.syncedProjects.find();
    return projects;
  }
}
