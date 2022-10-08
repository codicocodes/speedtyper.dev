import { SyncedProject } from '../synced-projects/synced-project.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class TrackedProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  fullName: string;

  @OneToOne(() => SyncedProject, (synced) => synced.trackedProject)
  syncedProject?: SyncedProject;
}
