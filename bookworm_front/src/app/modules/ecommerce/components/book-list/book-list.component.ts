import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../../core/models/book';
import { BookService } from '../../../../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BookFormatEnum } from '../../../../shared/enums/book-format-enum';

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
  previousKeyword: string;
  pageNumber: number;
  totalElements: number = 0;
  pageSize: number = 20;
  totalPages: number = 0;
  bookFormats = BookFormatEnum;

  constructor(private bookService: BookService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.keywordSearchMode$ = this.bookService
      .getKeywordSearchObservable()
      .subscribe(keyword => {
        this.getBooks(keyword);
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

  getBooks(keyword?: string) {
    if (keyword && keyword.trim().length > 0) {
      this.handleListBooksByKeyword(keyword);
      return;
    }

    const filterParameter = this.route.snapshot.paramMap.has('name');

    if (filterParameter) {
      this.handleListBookByAuthor();
    } else {
      this.handleListBooksByCategoryOrFormat();
    }
  }

  handleListBooksByKeyword(keyword: string): void {
    if (this.previousKeyword !== keyword) {
      this.pageNumber = 0;
    }

    this.previousKeyword = keyword;

    this.bookService
      .getBookListByKeyword(keyword, this.pageNumber)
      .subscribe(this.processResult());
  }

  private processResult() {
    return (data: any) => {
      console.log('data', data);
      this.books = data.content;
      this.pageNumber = data.number;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
    };
  }

  handleListBooksByCategoryOrFormat() {
    const routeParameterName = this.route.snapshot.url[0].path;
    const routeId = Number(this.route.snapshot.paramMap.get('id') ?? -1);

    if (
      this.currentParameterName !== routeParameterName ||
      routeId !== this.currentId
    ) {
      this.pageNumber = 0;
    }
    [this.currentParameterName, this.currentId] = [routeParameterName, routeId];

    this.bookService
      .getBookList(
        this.currentId,
        this.currentParameterName,
        this.currentPriceFilter,
        this.pageNumber
      )
      .subscribe(this.processResult());
  }

  handleListBookByAuthor() {
    const routeAuthorName = decodeURIComponent(
      this.route.snapshot.paramMap.get('name')!.trim()
    );

    if (this.currentAuthorName !== routeAuthorName) {
      this.pageNumber = 0;
    }

    this.currentAuthorName = routeAuthorName;

    this.bookService
      .getBookListByAuthor(
        this.currentAuthorName,
        this.currentPriceFilter,
        this.pageNumber
      )
      .subscribe(this.processResult());
  }

  changePriceFilter(event: PriceFilter) {
    this.currentPriceFilter = event;
    this.getBooks();
  }

  paginate(event: any) {
    this.pageNumber = event.page;
    this.getBooks();
  }
}

export interface PriceFilter {
  startPrice: number;
  endPrice: number;
}
