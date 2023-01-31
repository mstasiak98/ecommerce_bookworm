import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { EnumHelper } from '../../../../shared/helpers/enum-helper';
import { OrderStatus } from '../../../../shared/enums/order-status';
import { OrderDto } from '../../../../core/models/order-dto';
import { ActivatedRoute } from '@angular/router';
import { $e } from '@angular/compiler/src/chars';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders: OrderDto[] = [];
  orderStatuses: { id: number; name: string }[] = [];
  status: boolean;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.orderStatuses = EnumHelper.enumToDropdownOptions(OrderStatus);
    this.route.paramMap.subscribe(() => {
      this.listOrders();
    });
  }

  private listOrders(): void {
    this.status = this.route.snapshot.url.toString() !== 'orders';
    this.orderService.getAllOrders(this.status).subscribe(data => {
      this.orders = data;
    });
  }

  statusChanged(order: OrderDto, event: any) {
    this.orderService.changeOrderStatus(order.id, event.value).subscribe({
      next: resp => {
        const result = resp.body;
        if (result) {
          this.toastService.showSuccessMessage('Status changed');
        } else {
          this.toastService.showErrorMessage('Could not change status');
          this.listOrders();
        }
      },
      error: err => {
        this.toastService.showErrorMessage(err.message);
        this.listOrders();
      },
    });
  }
}
