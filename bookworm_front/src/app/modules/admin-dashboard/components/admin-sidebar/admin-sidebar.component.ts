import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  signout() {
    this.authService.logout().subscribe({
      error: err => {
        console.log('err', err);
      },
    });
    this.storageService.cleanSession();
    window.location.reload();
  }
}
