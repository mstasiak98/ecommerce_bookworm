import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable, of, Subject, Subscription } from 'rxjs';
import { Book } from '../../core/models/book';
import { BookCategory } from '../../core/models/book-category';
import { BookFormat } from '../../core/models/book-format';
import { Author } from '../../core/models/author';
import { PriceFilter } from '../../modules/ecommerce/components/book-list/book-list.component';
import { ObjectAssignBuiltinFn } from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/builtin';
import { ConfirmationService } from 'primeng/api';
import { BookFormData } from '../../core/models/book-form-data';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = `${environment.baseUrl}/books`;
  private readonly categoryUrl = `${environment.categoryUrl}`;
  private readonly formatUrl = `${environment.formatUrl}`;
  triggerKeywordSearch = new Subject<string>();

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService
  ) {}

  setFormatParams(bookFormData: BookFormData): Observable<BookFormat> {
    const url = `${this.baseUrl}/book/set-format-params`;
    return this.httpClient.put<BookFormat>(url, bookFormData);
  }

  deleteRestoreBook(bookId: number, isRestore: boolean): Observable<boolean> {
    const action = isRestore ? 'restore' : 'remove';
    const url = `${this.baseUrl}/${action}/${bookId}`;
    return this.httpClient.delete<boolean>(url);
  }

  changeCover(bookId: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/change-cover/${bookId}`;
    return this.httpClient.put<any>(url, formData);
  }

  addBook(formData: FormData): Observable<Book> {
    const url = `${this.baseUrl}/add`;
    return this.httpClient.post<Book>(url, formData);
  }

  editBook(id: number, formData: FormData): Observable<Book> {
    const url = `${this.baseUrl}/edit/${id}`;
    return this.httpClient.put<Book>(url, formData);
  }

  getAllBooks(isDeleted: boolean = false): Observable<any> {
    const url = `${this.baseUrl}/all`;
    return this.httpClient.get(url, {
      params: {
        isDeleted: isDeleted,
      },
    });
  }

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
      return this.getBooks(priceFilter, pageNumber);
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

  private getBooks(priceFilter: PriceFilter, pageNumber: number) {
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
