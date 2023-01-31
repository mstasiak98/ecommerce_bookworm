import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BookCategory } from '../../core/models/book-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly BASE_URL = `${environment.baseUrl}/categories`;

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<BookCategory[]> {
    const url = this.BASE_URL + '/all';
    return this.httpClient.get<BookCategory[]>(url);
  }

  addCategory(categoryName: string): Observable<BookCategory> {
    const url = this.BASE_URL + '/add';
    return this.httpClient.post<BookCategory>(url, { name: categoryName });
  }

  editCategory(
    categoryId: number,
    categoryName: string
  ): Observable<BookCategory> {
    const url = `${this.BASE_URL}/edit/${categoryId}`;
    return this.httpClient.put<BookCategory>(url, { name: categoryName });
  }

  removeCategory(categoryId: number): Observable<boolean> {
    const url = `${this.BASE_URL}/remove/${categoryId}`;
    return this.httpClient.delete<boolean>(url);
  }
}
