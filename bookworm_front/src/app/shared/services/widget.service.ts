import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { WidgetData } from '../../core/models/widget-data';
@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private readonly BASE_WIDGET_URL = `${environment.baseUrl}/widget`;
  private readonly STATS_URL = `${environment.baseUrl}/orders`;
  constructor(private httpClient: HttpClient) {}

  public getWidgetData(): Observable<WidgetData> {
    return this.httpClient.get<WidgetData>(this.BASE_WIDGET_URL);
  }

  public getTopSellingCategories(): Observable<any> {
    const url = `${this.STATS_URL}/top-categories`;
    return this.httpClient.get(url);
  }

  public getSalesMonthly(): Observable<any> {
    const url = `${this.STATS_URL}/monthly`;
    return this.httpClient.get(url);
  }
}
