import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

@Injectable()
export class ReadProjectsFromFile {
  private static FILE_PATH = './tracked-projects.txt';
  async *readProjects() {
    const stream = createReadStream(ReadProjectsFromFile.FILE_PATH);
    const rl = createInterface({
      input: stream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      const slug = line.trim();
      yield validateProjectName(slug);
    }
  }
}

export function validateProjectName(slug: string) {
  let [owner, repo] = slug.split('/');
  owner = owner.trim();
  repo = repo.trim();
  if (!owner || !repo) {
    throw new Error(slug);
  }
  return [owner, repo].join('/');
}
