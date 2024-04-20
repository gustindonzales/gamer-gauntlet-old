import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TournamentsFacadeService } from '../store/tournaments.facade.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
})
export class TournamentComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  public tournamentFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
  unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.tournamentFacadeService.getSelectedTournament(params['id'], true);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
