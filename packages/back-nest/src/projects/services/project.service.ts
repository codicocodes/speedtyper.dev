import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private syncedProjects: Repository<Project>,
  ) {}

  async bulkUpsert(projects: Project[]): Promise<void> {
    await this.syncedProjects.upsert(projects, ['fullName']);
  }

  async findByFullName(fullName: string) {
    const project = await this.syncedProjects.findOneBy({
      fullName,
    });
    return project;
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.syncedProjects.find();
    return projects;
  }
}
