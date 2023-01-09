import { IsString } from 'class-validator';
import { Profile } from 'passport-github';
import { User } from './user.entity';

export class UpsertGithubUserDTO {
  @IsString()
  username: string;
  @IsString()
  githubId: string;
  @IsString()
  githubUrl: string;
  @IsString()
  avatarUrl: string;

  static fromGithubProfile(profile: Profile) {
    const user = new UpsertGithubUserDTO();
    user.githubId = profile.id;
    user.username = profile.username;
    user.githubUrl = profile.profileUrl;
    user.avatarUrl = profile.photos[0].value;
    return user;
  }
  toUser() {
    const user = new User();
    user.githubId = parseInt(this.githubId);
    user.username = this.username;
    user.githubUrl = this.githubUrl;
    user.avatarUrl = this.avatarUrl;
    return user;
  }
}
