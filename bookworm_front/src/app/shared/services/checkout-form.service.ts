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
