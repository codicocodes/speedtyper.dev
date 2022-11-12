import { Injectable } from '@nestjs/common';

@Injectable()
export class LiteralService {
  calculateLiterals(code: string) {
    const literals = code
      .substring(0)
      .split(/[.\-=/_\:\;\,\}\{\)\(\"\'\]\[\/\#\?\>\<\&\*]/)
      .flatMap((r) => {
        return r.split(/[\n\r\s\t]+/);
      })
      .filter(Boolean);
    return literals;
  }
}
