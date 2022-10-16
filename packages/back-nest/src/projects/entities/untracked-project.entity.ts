import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UntrackedProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  fullName: string;
}
