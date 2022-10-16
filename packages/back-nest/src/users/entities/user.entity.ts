import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  htmlUrl: string;
  @Column()
  avatarUrl: string;
  @Column()
  banned: boolean;

  isAnonymous: boolean;
  static generateAnonymousUser() {
    const user = new User();
    user.id = randomUUID();
    user.username = generateRandomUsername();
    user.isAnonymous = true;
    return user;
  }
}
