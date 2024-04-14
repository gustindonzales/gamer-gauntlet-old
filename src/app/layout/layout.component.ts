import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClerkService } from '../services/shared/clerk.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AvatarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  protected clerkService: ClerkService = inject(ClerkService);
  presentSignIn(): void {
    this.clerkService.openSignIn();
  }
}
