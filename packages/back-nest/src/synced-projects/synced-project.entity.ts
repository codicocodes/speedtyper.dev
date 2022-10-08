import { TrackedProject } from '../tracked-projects/tracked-project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { GithubRepository } from 'src/connectors/github/dtos/github-repository.dto';

@Entity()
export class SyncedProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  fullName: string;
  @Column({ unique: true })
  htmlUrl: string;
  @Column()
  language: string;
  @Column()
  stars: number;
  @Column()
  licenseName: string;
  @Column()
  ownerAvatar: string;
  @Column()
  defaultBranch: string;
  @OneToOne(() => TrackedProject, (tracked) => tracked.syncedProject)
  @JoinColumn()
  trackedProject: TrackedProject;

  static fromGithubRepository(tracked: TrackedProject, repo: GithubRepository) {
    const project = new SyncedProject();
    project.fullName = tracked.fullName;
    project.htmlUrl = repo.html_url;
    project.stars = repo.stargazers_count;
    project.language = repo.language;
    project.licenseName = repo.license.name;
    project.ownerAvatar = repo.owner.avatar_url;
    project.defaultBranch = repo.default_branch;
    project.trackedProject = tracked;
    return project;
  }
}
