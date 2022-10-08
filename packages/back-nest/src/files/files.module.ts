import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubConnectorModule } from 'src/connectors/github/github.module';
import { SyncedProjectsModule } from 'src/synced-projects/synced-projects.module';
import { ImportFilesRunner } from './commands/run-import-files';
import { File } from './file.entity';
import { FilesService } from './services/files';
import { FilesFilterer } from './services/files-filterer';
import { FilesImporter } from './services/files-importer';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    SyncedProjectsModule,
    GithubConnectorModule,
  ],
  providers: [FilesFilterer, FilesImporter, ImportFilesRunner, FilesService],
})
export class FilesModule {}
