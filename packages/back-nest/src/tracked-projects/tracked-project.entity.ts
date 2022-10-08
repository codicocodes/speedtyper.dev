import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackedProject {
  @PrimaryGeneratedColumn()
  pk: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  fullName: string;
}
