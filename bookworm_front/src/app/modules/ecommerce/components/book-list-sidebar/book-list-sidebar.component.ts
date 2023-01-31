import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from '../../../../shared/services/book.service';
import { BookCategory } from '../../../../core/models/book-category';
import { BookFormat } from '../../../../core/models/book-format';
import { Author } from '../../../../core/models/author';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-book-list-sidebar',
  templateUrl: './book-list-sidebar.component.html',
  styleUrls: ['./book-list-sidebar.component.scss'],
})
export class BookListSidebarComponent implements OnInit {
  priceRangeValues: number[] = [5, 100];
  bookCategories: BookCategory[] = [];
  bookFormats: { id: number; formatName: string }[] = [];
  bookAuthors: Author[] = [];

  @Output() newPriceFilter = new EventEmitter<any>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.listBookCategories();
  }

  private listBookCategories(): void {
    forkJoin([
      this.bookService.getBookCategories(),
      this.bookService.getBookFormats(),
      this.bookService.getBookAuthors(),
    ]).subscribe({
      next: value => {
        const [categories, formats, authors] = value;
        this.bookCategories = categories;
        this.bookFormats = formats;
        this.bookAuthors = authors;
      },
    });
  }

  applyPriceFilter() {
    const priceFilter = {
      startPrice: this.priceRangeValues[0],
      endPrice: this.priceRangeValues[1],
    };
    this.newPriceFilter.emit(priceFilter);
  }

  encodeURI(authorName: string) {
    return encodeURIComponent(authorName.trim());
  }
}
