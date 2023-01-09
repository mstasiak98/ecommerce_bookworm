import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book';
import { BookService } from '../../../../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  currentId: number;
  currentParameterName: string;
  currentAuthorName: string;
  currentPriceFilter: PriceFilter;
  keywordSearchMode$: Subscription;
  currentKeyword: string;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.keywordSearchMode$ = this.bookService
      .getKeywordSearchObservable()
      .subscribe(keyword => {
        this.currentKeyword = keyword;
        this.getBooks();
      });
    // default filter values - (max range)
    this.currentPriceFilter = { startPrice: 0, endPrice: 100 };

    this.route.paramMap.subscribe(() => {
      this.getBooks();
    });
  }

  ngOnDestroy() {
    this.keywordSearchMode$.unsubscribe();
  }

  getBooks() {
    if (this.currentKeyword && this.currentKeyword.trim().length > 0) {
      this.handleListBooksByKeyword();
      return;
    }

    const filterParameter = this.route.snapshot.paramMap.has('name');

    if (filterParameter) {
      this.handleListBookByAuthor();
    } else {
      this.handleListBooksByCategoryOrFormat();
    }
  }

  handleListBooksByKeyword(): void {
    this.bookService
      .getBookListByKeyword(this.currentKeyword)
      .subscribe(data => {
        this.books = data;
      });
  }

  handleListBooksByCategoryOrFormat() {
    this.currentParameterName = this.route.snapshot.url[0].path;

    this.currentId = Number(this.route.snapshot.paramMap.get('id') ?? -1);

    this.bookService
      .getBookList(
        this.currentId,
        this.currentParameterName,
        this.currentPriceFilter
      )
      .subscribe(data => {
        this.books = data;
      });
  }

  handleListBookByAuthor() {
    this.currentAuthorName = decodeURIComponent(
      this.route.snapshot.paramMap.get('name')!.trim()
    );

    this.bookService
      .getBookListByAuthor(this.currentAuthorName, this.currentPriceFilter)
      .subscribe(data => {
        this.books = data;
      });
  }

  changePriceFilter(event: PriceFilter) {
    this.currentPriceFilter = event;
    this.getBooks();
  }
}

export interface PriceFilter {
  startPrice: number;
  endPrice: number;
}
