import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list-sidebar',
  templateUrl: './book-list-sidebar.component.html',
  styleUrls: ['./book-list-sidebar.component.scss'],
})
export class BookListSidebarComponent implements OnInit {
  categories: any[] = [
    { name: 'Art', extra: '0' },
    { name: 'Sport', extra: '20' },
    { name: 'Biography', extra: '10' },
    { name: 'Children', extra: '4' },
    { name: 'Cookbooks', extra: '8' },
  ];

  authors: any[] = [
    { name: 'Cathy', extra: '0' },
    { name: 'Anna', extra: '20' },
    { name: 'Ashley', extra: '10' },
    { name: 'Brian', extra: '4' },
    { name: 'Colleen', extra: '8' },
  ];

  formats: any[] = [
    { name: 'Hardcover', extra: '0' },
    { name: 'Kindle', extra: '20' },
    { name: 'Paperback', extra: '10' },
  ];

  priceRangeValues: number[] = [5, 100];

  constructor() {}

  ngOnInit(): void {}
}
