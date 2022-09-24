export class InvalidRepoInput extends Error {
  constructor(slug: string) {
    super(`Invalid repo input: ${slug}`);
    Object.setPrototypeOf(this, InvalidRepoInput.prototype);
  }
}
