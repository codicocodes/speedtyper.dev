import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './services/project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Get('languages')
  getLeaderboard(): Promise<string[]> {
    return this.projectService.getLanguages();
  }
}
