import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class CodeCacheService {
  private cache = {};

  set(key: string, value: any, ttl: number) {
    this.cache[key] = value;
    setTimeout(() => {
      delete this.cache[key];
    }, ttl);
  }

  get(key: string) {
    return this.cache[key];
  }

  getAll() {
    return this.cache;
  }

  delete(key: string) {
    delete this.cache[key];
  }
}
