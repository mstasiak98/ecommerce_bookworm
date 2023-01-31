import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDto } from '../../../../core/models/order-dto';
import { EnumHelper } from '../../../../shared/helpers/enum-helper';
import { OrderStatus } from '../../../../shared/enums/order-status';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { Address } from '../../../../core/models/address';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: OrderDto;
  orderStatuses: { id: number; name: string }[] = [];
  selectedStatus: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderStatuses = EnumHelper.enumToDropdownOptions(OrderStatus);

    this.route.paramMap.subscribe(() => {
      this.listOrderDetails();
    });
  }

  private listOrderDetails(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      const orderId = +this.route.snapshot.paramMap.get('id')!;
      this.orderService.getOrderDetails(orderId).subscribe(data => {
        this.order = data;
      });
    }
  }

  statusChanged(event: any): void {
    this.orderService
      .changeOrderStatus(this.order.id, event.value)
      .subscribe(resp => {
        if (resp.body) {
          this.toastService.showSuccessMessage('Status changed');
        } else {
          this.toastService.showErrorMessage('Error while changing status');
        }
      });
  }

  openAddressDialog(addressType: string) {
    const address =
      addressType === 'billing'
        ? this.order.billingAddress
        : this.order.shippingAddress;
    const ref = this.dialogService.open(AddressDialogComponent, {
      header: `Change ${addressType} address details`,
      width: '40%',
      data: {
        address: address,
      },
    });

    ref.onClose.subscribe((resp: Address) => {
      if (this.order.billingAddress.id === resp.id) {
        this.order.billingAddress = resp;
      } else {
        this.order.shippingAddress = resp;
      }
    });
  }

  openCustomerDialog() {
    const ref = this.dialogService.open(CustomerDialogComponent, {
      header: `Change customer information`,
      width: '40%',
      data: {
        customer: this.order.customer,
      },
    });

    ref.onClose.subscribe(resp => {
      this.order.customer = resp;
    });
  }

  deleteOrder(): void {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete this order?',

      accept: () => {
        this.remove();
      },
    });
  }

  private remove() {
    this.orderService.removeOrder(this.order.id).subscribe({
      next: resp => {
        if (resp.body) {
          this.toastService.showSuccessMessage('Order deleted');
          this.router.navigate(['/admin/orders']);
        } else {
          this.toastService.showErrorMessage('Error while deleting order');
        }
      },
      error: err => {
        this.toastService.showErrorMessage(err.message);
      },
    });
  }
}
