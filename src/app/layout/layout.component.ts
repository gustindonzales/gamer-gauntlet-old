import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConvexService } from '../services/shared/convex.service';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    AvatarComponent,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  protected convexService: ConvexService = inject(ConvexService);
  presentSignIn(): void {
    this.convexService.openSignIn();
  }
}
