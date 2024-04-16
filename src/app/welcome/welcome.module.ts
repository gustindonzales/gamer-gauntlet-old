import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, WelcomeRoutingModule, RouterModule, MatButtonModule],
})
export class WelcomeModule {}
