import fs from "fs";
import readline from "readline";
import { InvalidRepoInput as InvalidSlug } from "../errors";

export class ReadSlugsFromFile {
  constructor(private filePath: string) {}
  async *readSlugs() {
    const fileStream = fs.createReadStream(this.filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      const slug = line.trim();
      yield this._validateSlug(slug);
    }
  }
  private _validateSlug(slug: string) {
    let [owner, repo] = slug.split("/");
    owner = owner.trim();
    repo = repo.trim();
    if (!owner || !repo) {
      throw new InvalidSlug(slug);
    }
    return [owner, repo].join("/");
  }
}
