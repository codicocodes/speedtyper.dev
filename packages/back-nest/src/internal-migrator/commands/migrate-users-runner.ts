import { Command, CommandRunner } from 'nest-commander';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { streamLegacyData, INTERNAL_USERS_STREAM_API } from '../api';

@Command({
  name: 'import-legacy-users',
  arguments: '',
  options: {},
})
export class ImportLegacyUsersRunner extends CommandRunner {
  constructor(private service: UserService) {
    super();
  }
  async run(): Promise<void> {
    const saveLegacyUser = async (legacyUser: any) => {
      const user = new User();
      user.username = legacyUser.username;
      user.githubId = legacyUser.githubId;
      user.githubUrl = legacyUser.githubUrl;
      user.avatarUrl = legacyUser.avatarUrl;
      user.createdAt = legacyUser.__createdAt;
      user.banned = legacyUser.banned;
      user.legacyId = legacyUser._id;
      await this.service.upsertGithubUser(user);
    };
    await streamLegacyData(INTERNAL_USERS_STREAM_API, saveLegacyUser);
  }
}
