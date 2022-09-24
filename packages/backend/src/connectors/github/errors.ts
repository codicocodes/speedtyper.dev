export class FailedGithubRequest extends Error {
  status: number;
  url: string;
  constructor(url: string, status: number) {
    super(`Request to failed with status: ${status}`);
    this.status = status;
    this.url = url;
    Object.setPrototypeOf(this, FailedGithubRequest.prototype);
  }
}

export class InvalidGithubBlob extends Error {
  constructor(msg?: string) {
    super(`Invalid Github Blob: ${msg}`);
    Object.setPrototypeOf(this, InvalidGithubBlob.prototype);
  }
}

export class InvalidGithubRepository extends Error {
  constructor(msg?: string) {
    super(`Invalid Github Repository: ${msg}`);
    Object.setPrototypeOf(this, InvalidGithubRepository.prototype);
  }
}

export class InvalidGithubUser extends Error {
  constructor(msg?: string) {
    super(`Invalid Github User: ${msg}`);
    Object.setPrototypeOf(this, InvalidGithubUser.prototype);
  }
}

export class InvalidGithubToken extends Error {
  constructor(msg?: string) {
    super(`Invalid Github Token: ${msg}`);
    Object.setPrototypeOf(this, InvalidGithubToken.prototype);
  }
}

export class InvalidGithubTree extends Error {
  constructor(msg?: string) {
    super(`Invalid Github Tree: ${msg}`);
    Object.setPrototypeOf(this, InvalidGithubTree.prototype);
  }
}
