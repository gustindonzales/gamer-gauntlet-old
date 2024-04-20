import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  SecurityContext,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CKEditorModule, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { map, take } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';
import {
  AutocompleteComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
} from '../../components/form';
import { TextareaComponent } from '../../components/form/textarea/textarea.component';
import { OrdinalPipe } from '../../shared/pipes/ordinal.pipe';
import { CreateTournamentRequest } from '../models';
import { TournamentService } from '../services/tournament.service';
import { TournamentsFacadeService } from '../store/tournaments.facade.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer } from '@angular/platform-browser';

export const ConditionAnimation = trigger('conditionalTrigger', [
  state('shown', style({ opacity: 1 })),
  transition('shown => void', [
    animate('0.5s', style({ opacity: 0, transform: 'translateY(-100%)' })),
  ]),
  transition('void => shown', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

enum FeeDistributionType {
  winnerTakesAll = 'winnerTakesAll',
  customDistribution = 'customDistribution',
}

enum TournamentFormat {
  team = 'team',
  player = 'player',
}

export function sumValidator(amount: number, msg: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sum = control.value.reduce(
      (acc: number, val: number) => acc + (val || 0),
      0,
    );
    return sum === amount ? null : { sumError: { message: msg } };
  };
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control || !control.parent) {
      return null;
    }

    const formArray = control.parent as FormArray;
    const sum = formArray.controls
      .map((control) => control.value)
      .reduce((acc, value) => acc + value, 0);

    if (sum !== amount) {
      return { sumError: msg };
    }

    return null;
  };
}

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    CommonModule,
    NgxsFormPluginModule,
    CKEditorModule,

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
    MatDatepickerModule,
    NgxMatTimepickerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatRadioModule,

    OrdinalPipe,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
  animations: [ConditionAnimation],
})
export class NewComponent {
  private store: Store = inject(Store);
  public tournamentsFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
  private tournamentService: TournamentService = inject(TournamentService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  public Editor = ClassicEditor;
  private gamePlatforms = signal<Doc<'platforms'>[]>([]);
  public gamePlatformsOptions = computed<SelectOption[]>(() =>
    this.gamePlatforms().map(
      (platform) => <SelectOption>{ value: platform._id, label: platform.name },
    ),
  );

  public feeDistributionType = FeeDistributionType;
  public tournamentFormat = TournamentFormat;

  private distributionFeeErrorMessage: string =
    'The total of all places must equal 100';

  private sumValidator = sumValidator;

  public formatCodeSignal = signal<TournamentFormat>(
    this.tournamentFormat.player,
  );

  private fb: FormBuilder = inject(FormBuilder);
  public form: UntypedFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', []],
    game: ['', [Validators.required]],
    platforms: [
      { value: '', disabled: this.gamePlatformsOptions().length === 0 },
      [Validators.required],
    ],
    type: ['', [Validators.required]],
    format: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    teamSize: ['', []],
    maxEntries: ['', [Validators.required]],
    minEntries: ['', [Validators.required]],
    paidTournament: [false, []],
    feeDetails: this.fb.group({
      paidTournament: ['', []],
      entryFee: ['', []],
      feeDistributionType: [FeeDistributionType.winnerTakesAll, []],
      customDistribution: this.fb.array([
        this.fb.control('', []),
        this.fb.control('', []),
        this.fb.control('', []),
      ]),
    }),
  });

  ngOnInit() {
    this.form.get('minEntries')!.valueChanges.subscribe((value) => {
      const minPlayerFormControl = this.form.get('minEntries') as FormControl;
      const feeDetails = this.form.get('feeDetails') as UntypedFormGroup;
      const customDistributionFormArray = feeDetails.get(
        'customDistribution',
      ) as FormArray;

      if (minPlayerFormControl.invalid) {
        return;
      }

      if (value < customDistributionFormArray.length || value < 3) {
        // remove last elements from the customDistributionFormArray
        for (let i = customDistributionFormArray.length - 1; i >= value; i--) {
          customDistributionFormArray.removeAt(i);
        }
      }
    });
  }

  get startDateTime() {
    const startDate = this.form.get('startDate')?.value;
    const startTime = this.form.get('startTime')?.value;
    const date = new Date(startDate);
    const timeHours = +startTime.split(':')[0];
    const timeMinutes = +startTime.split(':')[1].split(' ')[0];
    const timePeriod = startTime.split(' ')[1];
    date.setHours(
      timePeriod == 'PM' ? +timeHours + 12 : +timeHours,
      +timeMinutes,
    );
    return date;
  }

  get isPaidTournament() {
    return this.form.get('paidTournament')?.value;
  }

  get feeDetails() {
    return this.form.get('feeDetails') as UntypedFormGroup;
  }

  get customDistribution() {
    return this.feeDetails.get('customDistribution') as FormArray;
  }

  getControlValidatorErrorMessage(control: AbstractControl, error: string) {
    if (control.hasError(error)) {
      return control.getError(error).message;
    }
    return '';
  }

  onDescriptionChange(event: ChangeEvent<ClassicEditor>) {
    const value = event.editor.getData();
    this.form.get('description')?.setValue(value);
  }

  onTournamentFormatChange(value: string) {
    const tournamentFormats = this.store.snapshot().tournaments
      .tournamentFormats as Doc<'tournamentFormats'>[];
    const format = tournamentFormats.find((format) => format._id === value);
    this.formatCodeSignal.set(format?.code as TournamentFormat);
    switch (format?.code) {
      case 'team':
        this.form.get('teamSize')?.setValidators([Validators.required]);
        break;
      case 'player':
        this.form.get('teamSize')?.clearValidators();
        break;
    }
    this.form.get('teamSize')?.updateValueAndValidity();
  }

  tournamentFormatIdToObject(id: string) {
    return this.tournamentsFacadeService.tournamentFormats$.pipe(
      take(1),
      map((formats) => formats.find((format) => format._id === id)),
    );
  }

  onPaidTournamentChange(value: boolean) {
    const entryFeeControl = this.getFormControl('entryFee');
    if (value) {
      entryFeeControl?.setValidators([Validators.required]);
    } else {
      entryFeeControl?.clearValidators();
    }
    entryFeeControl?.updateValueAndValidity();
  }

  onPaidTournamentExpansionToggle(isExpanded: boolean) {
    const entryFeeControl = this.feeDetails.get('entryFee');
    const paidTournamentControl = this.feeDetails.get('paidTournament');
    const customDistribution = this.customDistribution;

    if (!isExpanded) {
      paidTournamentControl?.setValue(false);
      entryFeeControl?.clearValidators();
      customDistribution.clearValidators();
      customDistribution.updateValueAndValidity();
      this.setCustomDistributionValidators(false);
    } else {
      const feeDistributionType = this.feeDetails.get(
        'feeDistributionType',
      )?.value;

      paidTournamentControl?.setValue(true);
      entryFeeControl?.setValidators([Validators.required]);
      this.onFeeDistributionTypeChange(feeDistributionType);
    }
    paidTournamentControl?.updateValueAndValidity();
    entryFeeControl?.updateValueAndValidity();
  }

  setCustomDistributionValidators(validate: boolean) {
    const customDistribution = this.customDistribution;
    if (validate) {
      customDistribution.setValidators([
        this.sumValidator(100, this.distributionFeeErrorMessage),
      ]);
      customDistribution.controls.forEach((control) => {
        control.setValidators([Validators.required]);
        control.updateValueAndValidity();
      });
    } else {
      customDistribution.clearValidators();
      customDistribution.controls.forEach((control) => {
        control.clearValidators();
        control.updateValueAndValidity();
      });
    }
  }

  onFeeDistributionTypeChange(value: string) {
    const feeDistributionType = value;
    if (feeDistributionType === FeeDistributionType.winnerTakesAll) {
      this.setCustomDistributionValidators(false);
    } else {
      this.setCustomDistributionValidators(true);
    }
  }

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
        if (result.length === 1) {
          platformsControl?.setValue([result[0]._id]);
        }

        if (result.length > 0) {
          platformsControl?.enable();
        }
      });
  }

  addCustomDistributionPlace() {
    const control = this.fb.control('', [Validators.required]);
    this.customDistribution.push(control);
  }

  removeCustomDistributionPlace() {
    this.customDistribution.removeAt(this.customDistribution.length - 1);
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const body: CreateTournamentRequest = {
      name: this.form.get('name')?.value,
      description:
        this.sanitizer.sanitize(
          SecurityContext.HTML,
          this.form.get('description')?.value,
        ) || '',
      gameId: this.form.get('game')?.value,
      platformIds: this.form.get('platforms')?.value,
      typeId: this.form.get('type')?.value,
      startDate: this.startDateTime.getTime(),
      maxEntries: this.form.get('maxEntries')?.value,
    };

    this.tournamentsFacadeService.createTournament(body);
  }
}
