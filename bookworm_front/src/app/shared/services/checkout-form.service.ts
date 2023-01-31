import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Country } from '../../core/models/country';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormService {
  private readonly BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    const url = `${this.BASE_URL}/countries`;
    return this.httpClient
      .get<GetResponseCountries>(url)
      .pipe(map(resp => resp._embedded.countries));
  }

  checkStateExistByName(name: string): Observable<boolean> {
    const url = `${this.BASE_URL}/countries/stateByName?name=${name}`;
    return this.httpClient.get<boolean>(url);
  }

  assignState(stateData: any): Observable<any> {
    const url = `${this.BASE_URL}/countries/add-state`;
    return this.httpClient.post(url, stateData);
  }

  addCountry(countryData: any): Observable<Country> {
    const url = `${this.BASE_URL}/countries/add`;
    return this.httpClient.post<Country>(url, countryData);
  }

  editCountry(countryId: number, countryData: any): Observable<Country> {
    const url = `${this.BASE_URL}/countries/edit/${countryId}`;
    return this.httpClient.put<Country>(url, countryData);
  }

  deleteState(stateId: number): Observable<boolean> {
    const url = `${this.BASE_URL}/countries/remove-state`;
    return this.httpClient.post<boolean>(url, null, {
      params: {
        id: stateId,
      },
    });
  }

  deleteCountry(countryId: number): Observable<boolean> {
    const url = `${this.BASE_URL}/countries/delete/${countryId}`;
    return this.httpClient.delete<boolean>(url);
  }

  getCreditCardMonths(): Observable<number[]> {
    const startMonth: number = new Date().getMonth() + 1;
    let months: number[] = [];
    for (let i = startMonth; i <= 12; i++) {
      months.push(i);
    }
    return of(months);
  }

  getCreditCardsYears(): Observable<number[]> {
    let years: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return of(years);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}
