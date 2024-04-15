import { Injectable } from '@angular/core';
import { ConvexClient } from 'convex/browser';
import {
  BehaviorSubject,
  Observable,
  firstValueFrom,
  from,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { api } from '../../../../convex/_generated/api';
import Clerk from '@clerk/clerk-js';

@Injectable({
  providedIn: 'root',
})
export class ConvexService {
  protected client = new ConvexClient(environment.CONVEX_URL);
  private clerk: Clerk;
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public isReady$ = new BehaviorSubject<boolean>(false);
  public user$ = new BehaviorSubject<any>(null);
  private template: string = 'convex';
  constructor() {
    this.clerk = new Clerk(environment.CLERK_PUBLISHABLE_KEY);
  }

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

  getToken() {
    return of(this.clerk.session?.getToken({ template: this.template }));
  }

  initClerk() {
    return from(this.clerk.load({})).pipe(
      take(1),
      switchMap(() => {
        return from(
          new Promise((resolve) => {
            this.client.setAuth(
              async () => firstValueFrom(this.getToken()),
              (loggedIn) => {
                if (!loggedIn) {
                  this.signOut();
                }

                resolve(true);
              },
            );
          }),
        );
      }),

      map(() => {
        console.log(this.client.client.hasAuth());
        this.isAuthenticated$.next(this.clerk.session !== null);
        this.isReady$.next(true);
        this.user$.next(this.clerk.session?.user);

        return {
          tokenIdentifier: this.clerk.session?.user.id,
          email: this.clerk.session?.user.emailAddresses[0].emailAddress,
          firstName: this.clerk.session?.user.firstName,
          lastName: this.clerk.session?.user.lastName,
        };
      }),
      switchMap((user) => {
        if (!user.tokenIdentifier) {
          return of();
        }
        return this.insert(api['users'].storeUser, user).pipe(
          map(() => {
            return;
          }),
        );
      }),
    );
  }

  openSignIn() {
    this.clerk.openSignIn();
  }
  openSignUp() {
    this.clerk.openSignUp();
  }
  signOut() {
    from(this.clerk.signOut())
      .pipe(take(1))
      .subscribe(() => {
        this.isAuthenticated$.next(false);
        this.user$.next(null);
      });
  }
}
