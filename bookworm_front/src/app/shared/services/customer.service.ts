import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from '../../core/models/customer';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly BASE_CUSTOMERS_URL = environment.baseUrl + '/customers';
  constructor(private httpClient: HttpClient) {}

  public editCustomer(id: number, customer: Customer): Observable<Customer> {
    const url = `${this.BASE_CUSTOMERS_URL}/${id}/edit`;
    return this.httpClient.put<Customer>(url, customer);
  }
}
