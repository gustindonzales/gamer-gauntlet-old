import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentsRoutingModule } from './tournaments-routing.module';
import { NgxsModule } from '@ngxs/store';
import { TournamentsState } from './store/tournaments.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    NgxsModule.forFeature([TournamentsState]),
  ],
})
export class TournamentsModule {}
