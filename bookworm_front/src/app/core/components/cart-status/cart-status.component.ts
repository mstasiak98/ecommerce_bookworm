import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss'],
})
export class CartStatusComponent implements OnInit {
  display: boolean = false;
  totalQuantity: number = 0;
  totalPrice: number = 0.0;
  cartItems: CartItem[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
      this.cartItems = this.cartService.cartItems;
    });

    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartService.clearCart();
  }

  deleteItemFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }
}
