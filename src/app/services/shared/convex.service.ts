import { Injectable } from '@angular/core';
import { ConvexClient } from 'convex/browser';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ConvexService {
  protected client = new ConvexClient(environment.CONVEX_URL);
  constructor() {}

  get<T>(func: any, listen: boolean = false): Observable<T> {
    if (listen) {
      return new Observable((observer) => {
        this.client.onUpdate(func, {}, (messages) => {
          observer.next(messages);
        });
      });
    }

    return from(this.client.query(func, {}));
  }

  insert<T>(func: any, args: T): Observable<T> {
    return from(this.client.mutation(func, args));
  }
}
