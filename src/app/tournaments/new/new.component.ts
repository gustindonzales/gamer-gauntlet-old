import { Component } from '@angular/core';
import { InputComponent, SelectComponent } from '../../components/form';
import { TextareaComponent } from '../../components/form/textarea/textarea.component';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [InputComponent, SelectComponent, TextareaComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {}
