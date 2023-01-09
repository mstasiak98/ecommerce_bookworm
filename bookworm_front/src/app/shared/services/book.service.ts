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

  getBookList(
    parameterId: number,
    filterParameter: string | null,
    priceFilter: PriceFilter
  ): Observable<Book[]> {
    if (parameterId < 0) {
      return this.getAllBooks(priceFilter);
    } else if (filterParameter === 'category') {
      return this.getBookListByCategory(parameterId, priceFilter);
    } else {
      return this.getBookListByFormat(parameterId, priceFilter);
    }
  }

  getBookListByKeyword(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/findByTitle?title=${keyword}`;
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map(resp => resp.content));
  }

  getBookListByAuthor(
    authorName: string,
    priceFilter: PriceFilter
  ): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/findByAuthorName?author=${authorName}&startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}`;
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map(resp => resp.content));
  }

  private getAllBooks(priceFilter: PriceFilter) {
    const searchUrl = `${this.baseUrl}?startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}`;
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map(resp => resp.content));
  }

  private getBookListByCategory(categoryId: number, priceFilter: PriceFilter) {
    const searchUrl = `${this.baseUrl}/findByCategory?id=${categoryId}&startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}`;
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map(resp => resp.content));
  }

  private getBookListByFormat(formatId: number, priceFilter: PriceFilter) {
    const searchUrl = `${this.baseUrl}/findByFormat?id=${formatId}&startPrice=${priceFilter.startPrice}&endPrice=${priceFilter.endPrice}`;
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map(resp => resp.content));
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.httpClient
      .get<GetResponseBookCategory>(this.categoryUrl)
      .pipe(map(response => response._embedded.bookCategory));
  }

  getBookFormats(): Observable<BookFormat[]> {
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
}

interface GetResponseBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  };
}

interface GetResponseBookFormat {
  _embedded: {
    bookFormat: BookFormat[];
  };
}
