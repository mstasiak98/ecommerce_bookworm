import { Customer } from './customer';
import { Address } from './address';
import { OrderItem } from './order-item';
import { Order } from './order';

export class Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];
}
