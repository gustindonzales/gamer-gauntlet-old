import { Component, computed, inject, signal } from '@angular/core';
import {
  AutocompleteComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
} from '../../components/form';
import { TextareaComponent } from '../../components/form/textarea/textarea.component';
import { TournamentsFacadeService } from '../store/tournaments.facade.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { map, take } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    AutocompleteComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  public tournamentsFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
  private tournamentService: TournamentService = inject(TournamentService);
  private gamePlatforms = signal<Doc<'platforms'>[]>([]);
  public gamePlatformsOptions = computed<SelectOption[]>(() =>
    this.gamePlatforms().map(
      (platform) => <SelectOption>{ value: platform._id, label: platform.name },
    ),
  );

  private fb: FormBuilder = inject(FormBuilder);
  public form: UntypedFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    game: ['', [Validators.required]],
    platforms: [{ value: '', disabled: true }, [Validators.required]],
    type: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    maxPlayers: ['', [Validators.required]],
  });

  getFormControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  onGameChange(gameId: string) {
    const platformsControl = this.form.get('platforms');
    platformsControl?.reset();
    platformsControl?.disable();
    this.tournamentService
      .getPlatformsByGameId(gameId, false)
      .pipe(
        take(1),
        // sort platforms by name asc
        map((platforms) =>
          platforms.sort((a, b) => a.name.localeCompare(b.name)),
        ),
      )
      .subscribe((result) => {
        this.gamePlatforms.set(result);
        if (result.length > 0) {
          platformsControl?.enable();
        }
      });
  }

  submit() {
    console.log(this.form.getRawValue());
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
