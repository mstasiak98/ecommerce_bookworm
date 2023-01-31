import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  display: boolean = false;
  keyword: string = '';
  showDropdown: boolean = false;
  isLoggedIn: boolean;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private storageService: StorageService,
    private roleService: NgxRolesService
  ) {
    this.isLoggedIn = storageService.isLoggedIn();
  }

  ngOnInit(): void {}

  searchByKeyword(event: Event) {
    this.bookService.triggerSearchByKeyword(this.keyword);
  }

  logout() {
    this.authService.logout().subscribe({
      error: err => {
        console.log('err', err);
      },
    });
    this.storageService.cleanSession();
    window.location.reload();
  }
}
