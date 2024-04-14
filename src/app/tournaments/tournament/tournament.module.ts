import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from '../../components/form';
import { TournamentRoutingModule } from './tournament-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    InputComponent,
    SelectComponent,
    TextareaComponent,
  ],
})
export class TournamentModule {}
