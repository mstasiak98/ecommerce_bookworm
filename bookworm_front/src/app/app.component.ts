import { Component } from '@angular/core';
import { StorageService } from './shared/services/storage.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bookworm_front';

  constructor(
    private storageService: StorageService,
    private rolesService: NgxRolesService,
    private permissionService: NgxPermissionsService
  ) {
    const user = storageService.getUser();
    console.log('user = ', user);
    if (user) {
      const roles = JSON.parse(user).roles;
      this.permissionService.loadPermissions(roles);
    }
  }
}
