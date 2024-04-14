import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewRoutingModule } from './new-routing.module';
import { InputComponent } from '../../components/form';

@NgModule({
  declarations: [],
  imports: [CommonModule, NewRoutingModule, InputComponent],
})
export class NewModule {}
