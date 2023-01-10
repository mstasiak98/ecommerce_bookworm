import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../core/models/book';

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

  book: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleBookDetails();
    });
  }

  private handleBookDetails(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookDetails(bookId).subscribe(data => {
      this.book = data;
      console.log('data = ', data);
    });
  }
}
