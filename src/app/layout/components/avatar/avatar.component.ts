import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClerkService } from '../../../services/shared/clerk.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  public clerkService: ClerkService = inject(ClerkService);
  private router: Router = inject(Router);
  private dropdownElement: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.dropdownElement = document.getElementById('userDropdown');
  }

  toggleDropdown(): void {
    if (this.dropdownElement) {
      this.dropdownElement.classList.toggle('hidden');
    }
  }

  navigateToRoute(route: string): void {
    this.toggleDropdown();
    this.router.navigateByUrl(route);
  }
}
