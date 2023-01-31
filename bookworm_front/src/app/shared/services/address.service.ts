import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Address } from '../../core/models/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly BASE_ADDRESS_URL = environment.baseUrl + '/address';
  constructor(private httpClient: HttpClient) {}

  public changeAddress(id: number, newAddress: Address): Observable<Address> {
    const url = `${this.BASE_ADDRESS_URL}/${id}/change`;
    return this.httpClient.put<Address>(url, newAddress);
  }
}
