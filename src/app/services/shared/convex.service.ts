import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import Clerk from '@clerk/clerk-js';
import { UserResource } from '@clerk/types';
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
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';
import { environment } from '../../../environments/environment.development';

export interface UserContext extends Doc<'users'> {
  clerk: UserResource;
}

@Injectable({
  providedIn: 'root',
})
export class ConvexService {
  protected client = new ConvexClient(environment.CONVEX_URL);
  private router: Router = inject(Router);
  private clerk: Clerk;
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public isReady$ = new BehaviorSubject<boolean>(false);
  public user$ = new BehaviorSubject<UserContext | null>(null);
  private template: string = 'convex';
  constructor() {
    this.clerk = new Clerk(environment.CLERK_PUBLISHABLE_KEY);
  }

  get<T>(func: any, args: any = {}, listen: boolean = false): Observable<T> {
    if (listen) {
      return new Observable((observer) => {
        this.client.onUpdate(func, args, (messages) => {
          observer.next(messages);
        });
      });
    }

    return from(this.client.query(func, args));
  }

  insert<T, T2>(func: any, args: T): Observable<T2> {
    return from(this.client.mutation(func, args));
  }

  action<T, T2>(func: any, args: T): Observable<T2> {
    return from(this.client.action(func, args));
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
        return {
          clerkId: this.clerk.session?.user.id,
          email: this.clerk.session?.user.emailAddresses[0].emailAddress,
          firstName: this.clerk.session?.user.firstName,
          lastName: this.clerk.session?.user.lastName,
        };
      }),
      switchMap((user) => {
        if (!user.clerkId) {
          return of();
        }
        return this.insert(api['users'].storeUser, user).pipe(
          take(1),
          map(() => {
            return;
          }),
        );
      }),
      switchMap(() =>
        this.clerk.session?.user.id
          ? (this.get(
              api['users'].getUserByTokenIdentifier,
              { clerkId: this.clerk.session?.user.id },
              false,
            ) as Observable<Doc<'users'>>)
          : of(null),
      ),
      map((user) => {
        this.isReady$.next(true);
        this.isAuthenticated$.next(this.clerk.session !== null);
        if (!user) {
          return null;
        }

        const userContext = {
          ...user,
          clerk: this.clerk.session!.user,
        };

        this.user$.next(userContext);
        return userContext;
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
        this.router.navigate(['/']);
        this.isAuthenticated$.next(false);
        this.user$.next(null);
      });
  }
}
