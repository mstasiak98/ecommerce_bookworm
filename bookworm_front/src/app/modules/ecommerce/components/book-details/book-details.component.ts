import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  options: any[] = [
    { name: 'Paperback', price: 12.12 },
    { name: 'Hardcover', price: 12.12 },
    { name: 'Kindle', price: 12.12 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
