import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConvexService } from '../services/shared/convex.service';
import { AvatarComponent } from './components/avatar/avatar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AvatarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  protected convexService: ConvexService = inject(ConvexService);
  presentSignIn(): void {
    this.convexService.openSignIn();
  }
}
