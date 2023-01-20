import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly ORDER_URL = environment.orderUrl;
  constructor(private httpClient: HttpClient) {}

  getOrderHistory(email: string): Observable<any> {
    const url = this.ORDER_URL + '/search/findByCustomerEmail?email=' + email;
    return this.httpClient.get(url);
  }
}
