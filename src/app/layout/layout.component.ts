import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConvexService } from '../shared/services/convex.service';
import { AvatarComponent } from './components/avatar/avatar.component';

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
  private router: Router = inject(Router);
  presentSignIn(): void {
    const redirectUrl = this.router.url;
    this.convexService.openSignIn(redirectUrl);
  }
}
