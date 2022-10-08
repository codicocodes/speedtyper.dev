import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../file.entity';

@Injectable()
export class FilesService {
  private static UpsertOptions = {
    conflictPaths: ['path', 'project'],
    skipUpdateIfNoValuesChanged: true,
  };
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async bulkUpsert(files: File[]): Promise<void> {
    await this.filesRepository.upsert(files, FilesService.UpsertOptions);
  }

  async findAll(): Promise<File[]> {
    const files = await this.filesRepository.find();
    return files;
  }
}
