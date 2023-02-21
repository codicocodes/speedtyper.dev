import { Module } from '@nestjs/common';
import { ResultsModule } from 'src/results/results.module';
import { UsersModule } from 'src/users/users.module';
import { ImportLegacyResultsRunner } from './commands/migrate-results-runner';
import { ImportLegacyUsersRunner } from './commands/migrate-users-runner';

@Module({
  providers: [ImportLegacyUsersRunner, ImportLegacyResultsRunner],
  imports: [UsersModule, ResultsModule],
})
export class InternalMigratorModule {}
