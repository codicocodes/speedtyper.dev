export class TrackedRepoDoesNotExist extends Error {
  slug: string;
  constructor(slug: string) {
    super(`Tracked repo does not exist: ${slug}`);
    this.slug = slug;
    Object.setPrototypeOf(this, TrackedRepoDoesNotExist.prototype);
  }
}
