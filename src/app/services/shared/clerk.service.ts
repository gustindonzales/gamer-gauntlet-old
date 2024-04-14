import { Injectable, inject } from '@angular/core';
import Clerk from '@clerk/clerk-js';
import { BehaviorSubject, from, map, switchMap, take } from 'rxjs';
import { api } from '../../../../convex/_generated/api';
import { environment } from '../../../environments/environment';
import { ConvexService } from './convex.service';

@Injectable({
  providedIn: 'root',
})
export class ClerkService {
  private clerk: Clerk;
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public isReady$ = new BehaviorSubject<boolean>(false);
  public user$ = new BehaviorSubject<any>(null);
  private convexService: ConvexService = inject(ConvexService);
  constructor() {
    this.clerk = new Clerk(environment.CLERK_PUBLISHABLE_KEY);
  }

  initClerk() {
    return from(this.clerk.load({})).pipe(
      take(1),
      map(() => {
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
      switchMap((user) =>
        this.convexService.insert(api['users'].storeUser, user).pipe(
          map(() => {
            return;
          }),
        ),
      ),
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
