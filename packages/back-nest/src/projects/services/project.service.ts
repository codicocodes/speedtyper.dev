import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async bulkUpsert(projects: Project[]): Promise<void> {
    await this.projectRepository.upsert(projects, ['fullName']);
  }

  async findByFullName(fullName: string) {
    const project = await this.projectRepository.findOneBy({
      fullName,
    });
    return project;
  }

  async updateSyncedSha(id: string, syncedSha: string) {
    await this.projectRepository.update(
      {
        id,
      },
      { syncedSha },
    );
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.projectRepository.find();
    return projects;
  }
}
