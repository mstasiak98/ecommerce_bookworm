import { Customer } from './customer';
import { Address } from './address';
import { OrderItemDto } from './order-item-dto';

export class OrderDto {
  id: number;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  status: any;
  dateCreated: Date;
  lastUpdated: Date;
  orderItems: OrderItemDto[];
  customer: Customer;
  billingAddress: Address;
  shippingAddress: Address;
}
