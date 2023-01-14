import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { CartItem } from '../../../../core/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  itemQuantity: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails(): void {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalQuantity.subscribe(
      data => (this.totalQuantity = data)
    );
    this.cartService.totalPrice.subscribe(data => (this.totalPrice = data));
    this.cartService.computeCartTotals();
  }

  calculateChangedQuantity(item: CartItem): void {
    if (item.quantity === 0) {
      this.cartService.removeFromCart(item);
    }
    this.cartService.computeCartTotals();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
}
