import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../../core/models/order-dto';
import { ResponseMessage } from '../../core/models/response-message';

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

  getAllOrders(status: boolean = false): Observable<OrderDto[]> {
    const url = `${this.ORDER_URL}/all?archive=${status}`;
    return this.httpClient.get<OrderDto[]>(url);
  }

  getOrderDetails(orderId: number): Observable<OrderDto> {
    const url = `${this.ORDER_URL}/${orderId}`;
    return this.httpClient.get<OrderDto>(url);
  }

  changeOrderStatus(
    orderId: number,
    status: number
  ): Observable<ResponseMessage> {
    const url = `${this.ORDER_URL}/${orderId}/change-status`;
    return this.httpClient.put<ResponseMessage>(url, { status: status });
  }

  removeOrder(id: number): Observable<ResponseMessage> {
    const url = `${this.ORDER_URL}/${id}/remove`;
    return this.httpClient.delete<ResponseMessage>(url);
  }
}
