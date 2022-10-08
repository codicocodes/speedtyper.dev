import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubConnectorModule } from 'src/connectors/github/github.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { UnsyncedFileImportRunner } from './commands/unsynced-file-import-runner';
import { UnsyncedFile } from './entities/unsynced-file.entity';
import { UnsyncedFileFilterer } from './services/unsynced-file-filterer';
import { UnsyncedFileImporter } from './services/unsynced-file-importer';
import { UnsyncedFileService } from './services/unsynced-file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnsyncedFile]),
    GithubConnectorModule,
    ProjectsModule,
  ],
  providers: [
    UnsyncedFileFilterer,
    UnsyncedFileImporter,
    UnsyncedFileImportRunner,
    UnsyncedFileService,
  ],
})
export class ChallengesModule {}
