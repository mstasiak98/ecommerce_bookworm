import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../shared/services/book.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  display: boolean = false;
  keyword: string = '';

  constructor(private bookService: BookService) {}

  searchByKeyword(event: Event) {
    console.log('event = ', event);
    this.bookService.triggerSearchByKeyword(this.keyword);
  }
}
