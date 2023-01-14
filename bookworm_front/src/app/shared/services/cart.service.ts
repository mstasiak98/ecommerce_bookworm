import { Injectable } from '@angular/core';
import { CartItem } from '../../core/models/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = sessionStorage;

  constructor() {
    const cartItems = this.storage.getItem('cartItems');
    if (!cartItems) return;
    const data: any = JSON.parse(cartItems);
    if (data) {
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

  addToCart(cartItem: CartItem) {
    console.log('poczatek');
    const existingCartItem = this.cartItems.find(
      item => item.id === cartItem.id && item.format.id === cartItem.format.id
    );

    console.log('existing cart', existingCartItem);

    if (existingCartItem) {
      existingCartItem.quantity += cartItem.quantity;
    } else {
      console.log('nie exisaiting');
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem): void {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  removeFromCart(cartItem: CartItem): void {
    const idx = this.cartItems.findIndex(
      item =>
        item.id === cartItem.id && cartItem.format.id === cartItem.format.id
    );

    if (idx > -1) {
      this.cartItems.splice(idx, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals(): void {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;
    for (let item of this.cartItems) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
    }

    this.totalQuantity.next(totalQuantity);
    this.totalPrice.next(totalPrice);
    this.saveCartItemsInStorage();
  }

  private saveCartItemsInStorage(): void {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  clearCart(): void {
    this.cartItems = [];
    this.storage.clear();
    this.computeCartTotals();
  }
}
