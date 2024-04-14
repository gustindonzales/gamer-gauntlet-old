import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, WelcomeRoutingModule, RouterModule],
})
export class WelcomeModule {}
