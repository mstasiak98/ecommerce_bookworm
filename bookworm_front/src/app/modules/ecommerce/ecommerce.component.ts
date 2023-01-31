import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
})
export class EcommerceComponent {
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
