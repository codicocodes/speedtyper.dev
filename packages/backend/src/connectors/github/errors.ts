export class FailedGithubRequest extends Error {
  status: number;
  constructor(status: number) {
    super(`Request failed with status: ${status}`);
    this.status = status;
    Object.setPrototypeOf(this, FailedGithubRequest.prototype);
  }
}

export class InvalidGithubRepository extends Error {
  constructor(msg?: string) {
    super(`Invalid Github Repository: ${msg}`);
    Object.setPrototypeOf(this, InvalidGithubRepository.prototype);
  }
}
