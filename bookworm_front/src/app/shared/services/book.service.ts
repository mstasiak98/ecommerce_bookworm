import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { Book } from '../../core/models/book';
import { BookCategory } from '../../core/models/book-category';
import { BookFormat } from '../../core/models/book-format';
import { Author } from '../../core/models/author';
import { PriceFilter } from '../../modules/ecommerce/components/book-list/book-list.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = `${environment.baseUrl}/books`;
  private readonly categoryUrl = `${environment.categoryUrl}`;
  private readonly formatUrl = `${environment.formatUrl}`;
  triggerKeywordSearch = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  getBookDetails(bookId: number): Observable<Book> {
    const url = `${this.baseUrl}/bookDetails?id=${bookId}`;
    return this.httpClient.get<Book>(url);
  }

  getBookList(
    parameterId: number,
    filterParameter: string | null,
    priceFilter: PriceFilter,
    pageNumber: number
  ): Observable<GetResponse> {
    if (parameterId < 0) {
      return this.getAllBooks(priceFilter, pageNumber);
    } else if (filterParameter === 'category') {
      return this.getBookListByCategory(parameterId, priceFilter, pageNumber);
    } else {
      return this.getBookListByFormat(parameterId, priceFilter, pageNumber);
    }
  }

  getBookListByKeyword(
    keyword: string,
    pageNumber: number
  ): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/findByTitle?title=${keyword}&page=${pageNumber}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getBookListByAuthor(
    authorName: string,
    priceFilter: PriceFilter,
    pageNumber: number
  ): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/findByAuthorName?author=${authorName}&startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}&page=${pageNumber}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  private getAllBooks(priceFilter: PriceFilter, pageNumber: number) {
    const searchUrl = `${this.baseUrl}?startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}&page=${pageNumber}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  private getBookListByCategory(
    categoryId: number,
    priceFilter: PriceFilter,
    pageNumber: number
  ) {
    const searchUrl = `${this.baseUrl}/findByCategory?id=${categoryId}&startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}&page=${pageNumber}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  private getBookListByFormat(
    formatId: number,
    priceFilter: PriceFilter,
    pageNumber: number
  ) {
    const searchUrl = `${this.baseUrl}/findByFormat?id=${formatId}&startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}&page=${pageNumber}`;
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.httpClient
      .get<GetResponseBookCategory>(this.categoryUrl)
      .pipe(map(response => response._embedded.bookCategory));
  }

  getBookFormats(): Observable<{ id: number; formatName: string }[]> {
    return this.httpClient
      .get<GetResponseBookFormat>(this.formatUrl)
      .pipe(map(response => response._embedded.bookFormat));
  }

  getBookAuthors(): Observable<Author[]> {
    const searchUrl = `${this.baseUrl}/getAuthors`;
    return this.httpClient.get<Author[]>(searchUrl);
  }

  triggerSearchByKeyword(keyword: string): void {
    this.triggerKeywordSearch.next(keyword);
  }

  getKeywordSearchObservable(): Observable<string> {
    return this.triggerKeywordSearch.asObservable();
  }
}

interface GetResponse {
  content: Book[];
  totalPages: number;
  size: number;
  totalElements: number;
  pageNumber: number;
}

interface GetResponseBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  };
}

interface GetResponseBookFormat {
  _embedded: {
    bookFormat: { id: number; formatName: string }[];
  };
}
