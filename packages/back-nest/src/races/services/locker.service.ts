import { Injectable } from '@nestjs/common';

@Injectable()
export class Locker {
  lockedIDs: Set<string>;
  constructor() {
    this.lockedIDs = new Set<string>();
  }

  // this is a global lock function
  // it locks all run methods called with this lockid
  // even if they are coming from different classes
  async runIfOpen<T>(lockID: string, callback: () => Promise<T>): Promise<T> {
    if (this.lockedIDs.has(lockID)) {
      return;
    }
    this.lockedIDs.add(lockID);
    try {
      return await callback();
    } finally {
      this.lockedIDs.delete(lockID);
    }
  }

  release(id: string) {
    this.lockedIDs.delete(id);
  }
}
