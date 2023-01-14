import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Purchase } from '../../core/models/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly purchaseUrl = environment.placeOrderUrl;

  constructor(private httpClient: HttpClient) {}

  public placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
