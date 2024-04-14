import { Observable, combineLatest } from 'rxjs';
import { ClerkService } from './services/shared/clerk.service';

export function initializeAppFactory(
  clerkService: ClerkService,
): () => Observable<[void]> {
  return () => combineLatest([clerkService.initClerk()]);
}
