import { Observable, combineLatest } from 'rxjs';
import { ConvexService } from './services/shared/convex.service';

export function initializeAppFactory(
  convexService: ConvexService,
): () => Observable<[void]> {
  return () => combineLatest([convexService.initClerk()]);
}
