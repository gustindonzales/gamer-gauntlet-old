import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TournamentsFacadeService } from '../../store/tournaments.facade.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { ConvexService } from '../../../services/shared/convex.service';
import { combineLatest, map, take } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  public tournamentFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
  private convexService: ConvexService = inject(ConvexService);

  platformsToString(platforms: Doc<'platforms'>[]): string {
    return platforms?.map((platform) => platform.name).join(', ');
  }

  isTournamentOwner() {
    return combineLatest([
      this.tournamentFacadeService.selectedTournament$,
      this.convexService.user$,
    ]).pipe(
      take(1),
      map(([tournament, user]) => {
        if (!tournament || !user) {
          return false;
        }
        return tournament.owner._id === user._id;
      }),
    );
  }
}
