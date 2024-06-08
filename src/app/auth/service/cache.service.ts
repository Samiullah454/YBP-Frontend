import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, data: any): void {
    this.cache.set(key, data);
  }
}