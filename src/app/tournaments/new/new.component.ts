import { Component, inject } from '@angular/core';
import { InputComponent, SelectComponent } from '../../components/form';
import { TextareaComponent } from '../../components/form/textarea/textarea.component';
import { TournamentsFacadeService } from '../store/tournaments.facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, InputComponent, SelectComponent, TextareaComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  public tournamentsFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
}
