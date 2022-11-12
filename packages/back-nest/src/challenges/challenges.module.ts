import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubConnectorModule } from 'src/connectors/github/github.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ChallengeImportRunner } from './commands/challenge-import-runner';
import { UnsyncedFileImportRunner } from './commands/unsynced-file-import-runner';
import { Challenge } from './entities/challenge.entity';
import { UnsyncedFile } from './entities/unsynced-file.entity';
import { ChallengeService } from './services/challenge.service';
import { LiteralService } from './services/literal.service';
import { ParserService } from './services/parser.service';
import { UnsyncedFileFilterer } from './services/unsynced-file-filterer';
import { UnsyncedFileImporter } from './services/unsynced-file-importer';
import { UnsyncedFileService } from './services/unsynced-file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnsyncedFile, Challenge]),
    GithubConnectorModule,
    ProjectsModule,
  ],
  providers: [
    ParserService,
    ChallengeService,
    LiteralService,
    ChallengeImportRunner,
    UnsyncedFileFilterer,
    UnsyncedFileImporter,
    UnsyncedFileImportRunner,
    UnsyncedFileService,
  ],
  exports: [ChallengeService, LiteralService],
})
export class ChallengesModule {}
