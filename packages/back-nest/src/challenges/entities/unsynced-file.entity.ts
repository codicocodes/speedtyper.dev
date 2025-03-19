import { GithubNode } from 'src/connectors/github/schemas/github-tree.dto';
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
export class UnsyncedFile {
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

  // Is this a circular dependency to project?
  @ManyToOne(() => Project, (project) => project.files)
  project: Project;

  static fromGithubNode(project: Project, treeSha: string, node: GithubNode) {
    const file = new UnsyncedFile();
    file.path = node.path;
    file.currentSha = node.sha;
    file.currentTreeSha = treeSha;
    file.project = project;
    return file;
  }
}
