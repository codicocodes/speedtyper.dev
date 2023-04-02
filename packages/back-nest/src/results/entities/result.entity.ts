import { Challenge } from 'src/challenges/entities/challenge.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  raceId: string;
  @Column()
  timeMS: number;
  @Column()
  cpm: number;
  @Column()
  mistakes: number;
  @Column()
  accuracy: number;

  @Column({ unique: true, nullable: true, default: null })
  legacyId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;
  @ManyToOne(() => Challenge, (challenge) => challenge.results, {
    onDelete: 'SET NULL',
  })
  challenge: Challenge;
  @ManyToOne(() => User, (user) => user.results, {
    onDelete: 'SET NULL',
  })
  user: User;
  userId: string;

  percentile?: number;
}
