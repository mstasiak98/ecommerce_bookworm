import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
})
export class OrdersHistoryComponent implements OnInit {
  orders: any[] = [];
  userEmail: string;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {
    const user = storageService.getUser();
    if (user) {
      this.userEmail = JSON.parse(user).email;
    }
  }

  ngOnInit(): void {
    this.orderService.getOrderHistory(this.userEmail).subscribe({
      next: data => {
        this.orders = data._embedded.orders;
        console.log('data ', data);
      },
      error: err => {
        console.log('error = ', err);
      },
    });
  }
}
