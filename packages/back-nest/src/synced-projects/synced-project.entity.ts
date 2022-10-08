import { TrackedProject } from '../tracked-projects/tracked-project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { GithubRepository } from 'src/connectors/github/dtos/github-repository.dto';
import { File } from 'src/files/file.entity';

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

  @OneToMany(() => File, (file) => file.project)
  files: File[];

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
