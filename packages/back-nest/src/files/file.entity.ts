import { GithubNode } from 'src/connectors/github/dtos/github-tree';
import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
} from 'typeorm';

@Entity()
@Index(['path', 'project'], { unique: true })
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  path: string;
  @Column()
  currentSha: string;
  @Column()
  currentTreeSha: string;
  @Column({ nullable: true })
  syncedSha?: string;

  @ManyToOne(() => Project, (project) => project.files)
  project: Project;

  static fromGithubNode(project: Project, treeSha: string, node: GithubNode) {
    const file = new File();
    file.path = node.path;
    file.currentSha = node.sha;
    file.currentTreeSha = treeSha;
    file.project = project;
    return file;
  }
}
