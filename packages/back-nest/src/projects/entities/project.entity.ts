import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GithubRepository } from 'src/connectors/github/dtos/github-repository.dto';
import { File } from 'src/files/file.entity';
import { UntrackedProject } from './untracked-project.entity';

@Entity()
export class Project {
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

  @OneToMany(() => File, (file) => file.project)
  files: File[];

  static fromGithubRepository(
    tracked: UntrackedProject,
    repo: GithubRepository,
  ) {
    const project = new Project();
    project.fullName = tracked.fullName;
    project.htmlUrl = repo.html_url;
    project.stars = repo.stargazers_count;
    project.language = repo.language;
    project.licenseName = repo.license.name;
    project.ownerAvatar = repo.owner.avatar_url;
    project.defaultBranch = repo.default_branch;
    return project;
  }
}
