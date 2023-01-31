import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private roleService: NgxRolesService,
    private permissionService: NgxPermissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveSession(data);
        const roles = data.roles as string[];
        this.permissionService.loadPermissions(roles);
        this.router.navigate(['/shop/books']).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        console.log('error = ', err);
      },
    });
  }
}
