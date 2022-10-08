import { Project } from 'src/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

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
}
