import { randomUUID } from 'crypto';
import { Result } from 'src/results/entities/result.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generateRandomUsername } from '../utils/generateRandomUsername';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  githubId: number;
  @Column({ unique: true })
  githubUrl: string;
  @Column()
  avatarUrl: string;
  @Column({ unique: true, nullable: true })
  legacyId: string;
  @Column({ default: false, select: false })
  banned: boolean;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
  isAnonymous: boolean;
  static generateAnonymousUser() {
    const user = new User();
    user.id = randomUUID();
    user.username = generateRandomUsername();
    user.isAnonymous = true;
    return user;
  }
}
