import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private permissionService: NgxPermissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.registrationForm.invalid) return;
    const { username, email, password } = this.registrationForm.value;
    this.isLoading = true;
    this.authService.register(username, email, password).subscribe({
      next: () => {
        this.authService.login(username, password).subscribe({
          next: resp => {
            this.storageService.saveSession(resp);
            const roles = resp.roles as string[];
            this.permissionService.loadPermissions(roles);
            this.router.navigate(['/shop/books']).then(() => {
              window.location.reload();
            });
          },
          error: err => {
            this.isLoading = false;
          },
        });
      },
      error: err => {
        this.isLoading = false;
      },
    });
    console.log('reg form = ', this.registrationForm.value);
  }
}
