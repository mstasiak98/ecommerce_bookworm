import { Component, OnInit } from '@angular/core';
import { WidgetData } from '../../../../core/models/widget-data';
import { WidgetService } from '../../../../shared/services/widget.service';
import { Widget } from '../../../../core/models/widget';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  widgetData: WidgetData;
  widgetClients: Widget;
  widgetEarnings: Widget;
  widgetOrders: Widget;
  widgetBooksSold: Widget;
  salesData: any;
  categoryChartData: any;
  constructor(private widgetService: WidgetService) {}

  ngOnInit(): void {
    const promises = [
      this.widgetService.getTopSellingCategories(),
      this.widgetService.getSalesMonthly(),
      this.widgetService.getWidgetData(),
    ];

    forkJoin(promises).subscribe(([topCat, sales, widgetData]) => {
      this.setTopSellingChart(topCat);
      this.setSalesChart(sales);
      this.setWidgetData(widgetData);
    });
  }

  private setTopSellingChart(
    data: { category_name: string; orders: number }[]
  ): void {
    const labels = data.map(x => x.category_name);
    const dataSet = data.map(x => x.orders);
    this.categoryChartData = {
      labels: labels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
        },
      ],
    };
  }

  private setSalesChart(data: { month: number; orders: number }[]): void {
    const dataSet = data.map(x => x.orders);
    this.salesData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Monthly product sales',
          data: dataSet,
          tension: 0.4,
        },
      ],
    };
  }

  private setWidgetData(data: WidgetData): void {
    this.widgetData = data;
    this.prepareWidgetInfo();
  }

  private prepareWidgetInfo(): void {
    this.widgetClients = new Widget(
      this.widgetData.newCustomers.toString(),
      'New customers',
      'pi-users',
      '#84bcda'
    );

    this.widgetOrders = new Widget(
      this.widgetData.totalOrders.toString(),
      'Orders received',
      'pi-shopping-cart',
      '#ffca3a'
    );

    console.log(this.widgetOrders);

    this.widgetEarnings = new Widget(
      this.widgetData.totalEarnings.toString() + ' USD',
      'Earned ',
      'pi-dollar',
      '#91cb3e'
    );

    this.widgetBooksSold = new Widget(
      this.widgetData.booksSold.toString(),
      'Books sold ',
      'pi-book',
      '#eb8258'
    );
  }
}
