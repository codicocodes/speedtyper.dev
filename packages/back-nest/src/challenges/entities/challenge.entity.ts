import TSParser from 'tree-sitter';
import { Project } from 'src/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UnsyncedFile } from './unsynced-file.entity';
import { GithubAPI } from 'src/connectors/github/services/github-api';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ select: false })
  sha: string;
  @Column({ select: false })
  treeSha: string;
  @Column()
  path: string;
  @Column({ unique: true })
  url: string;
  @Column({ unique: true })
  content: string;
  @ManyToOne(() => Project, (project) => project.files)
  project: Project;

  static fromTSNode(
    project: Project,
    file: UnsyncedFile,
    node: TSParser.SyntaxNode,
  ) {
    const challenge = new Challenge();
    challenge.path = file.path;
    challenge.sha = file.currentSha;
    challenge.treeSha = file.currentTreeSha;
    challenge.project = project;
    challenge.content = node.text;
    challenge.url = GithubAPI.getBlobPermaLink(
      project.fullName,
      file.currentTreeSha,
      file.path,
      // NOTE: row is 0 indexed, while #L is 1 indexed
      node.startPosition.row + 1,
    );
    return challenge;
  }
  static getStrippedCode(code: string) {
    const strippedCode = code
      .split('\n')
      .map((subText) => subText.trimStart())
      .join('\n');
    return strippedCode;
  }
}
