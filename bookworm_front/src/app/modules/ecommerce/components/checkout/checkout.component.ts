import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../../shared/services/cart.service';
import { CheckoutValidators } from '../../../../shared/validators/checkout-validators';
import { Route, Router } from '@angular/router';
import { CheckoutFormService } from '../../../../shared/services/checkout-form.service';
import { Country } from '../../../../core/models/country';
import { State } from '../../../../core/models/state';
import { Order } from '../../../../core/models/order';
import { OrderItem } from '../../../../core/models/order-item';
import { Purchase } from '../../../../core/models/purchase';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { CartItem } from '../../../../core/models/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  cartItems: CartItem[] = [];

  // @ts-ignore

  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private checkoutFormService: CheckoutFormService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.retrieveCartDetails();

    this.checkoutForm = this.formBuilder.group({
      differentShipping: [false, []],
      customer: this.formBuilder.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            CheckoutValidators.whitespaceValidator,
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            CheckoutValidators.whitespaceValidator,
          ],
        ],
        companyName: [''],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        phoneNumber: ['', [Validators.required]],
      }),
      billingAddress: this.formBuilder.group({
        street: [
          '',
          [Validators.required, CheckoutValidators.whitespaceValidator],
        ],
        city: [
          '',
          [Validators.required, CheckoutValidators.whitespaceValidator],
        ],
        state: [[Validators.required, CheckoutValidators.whitespaceValidator]],
        country: [
          [Validators.required, CheckoutValidators.whitespaceValidator],
        ],
        zipCode: [
          '',
          [Validators.required, CheckoutValidators.whitespaceValidator],
        ],
      }),
      shippingAddress: this.formBuilder.group({
        street: [
          '',
          [
            CheckoutValidators.conditionalValidator(
              () => this.checkoutForm.controls['differentShipping']!.value,
              Validators.compose([
                Validators.required,
                CheckoutValidators.whitespaceValidator,
              ])
            ),
          ],
          ,
        ],
        city: [
          '',
          [
            CheckoutValidators.conditionalValidator(
              () => this.checkoutForm.get('differentShipping')!.value,
              Validators.compose([
                Validators.required,
                CheckoutValidators.whitespaceValidator,
              ])
            ),
          ],
          ,
        ],
        state: [
          [
            CheckoutValidators.conditionalValidator(
              () => this.checkoutForm.get('differentShipping')!.value,
              Validators.compose([
                Validators.required,
                CheckoutValidators.whitespaceValidator,
              ])
            ),
          ],
        ],
        country: [
          [
            CheckoutValidators.conditionalValidator(
              () => this.checkoutForm.get('differentShipping')!.value,
              Validators.compose([
                Validators.required,
                CheckoutValidators.whitespaceValidator,
              ])
            ),
          ],
          ,
        ],
        zipCode: [
          '',
          [
            CheckoutValidators.conditionalValidator(
              () => this.checkoutForm.get('differentShipping')!.value,
              Validators.compose([
                Validators.required,
                CheckoutValidators.whitespaceValidator,
              ])
            ),
          ],
          ,
        ],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required]],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{16}')],
        ],
        securityCode: [
          '',
          [Validators.required, Validators.pattern('[0-9]{3}')],
        ],
        expirationMonth: [null],
        expirationYear: [null],
      }),
      extra: this.formBuilder.group({
        orderNotes: [''],
      }),
    });

    this.updateValidators();

    this.checkoutFormService.getCreditCardMonths().subscribe(data => {
      this.creditCardMonths = data;
    });

    this.checkoutFormService.getCreditCardsYears().subscribe(data => {
      this.creditCardYears = data;
    });

    this.cartItems = this.cartService.cartItems;

    this.checkoutFormService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  retrieveCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => (this.totalQuantity = totalQuantity)
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => (this.totalPrice = totalPrice)
    );
  }

  private updateValidators(): void {
    this.checkoutForm
      .get('differentShipping')
      ?.valueChanges.subscribe(value => {
        const shippingAddressGroup: FormGroup = this.checkoutForm.get(
          'shippingAddress'
        ) as FormGroup;

        Object.keys(shippingAddressGroup.controls).forEach(key => {
          this.checkoutForm
            .get('shippingAddress')
            ?.get(key)
            ?.updateValueAndValidity();
        });
      });
  }

  onSubmit(): void {
    /*    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }*/

    console.log('total price', this.totalPrice);
    const order = new Order(this.totalPrice, this.totalQuantity);
    const cartItems = this.cartService.cartItems;
    const orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item));

    const differentShipping =
      this.checkoutForm.controls['differentShipping'].value;
    const billingAddress = this.checkoutForm.controls['billingAddress'].value;

    const shippingAddress = !differentShipping
      ? billingAddress
      : this.checkoutForm.controls['shippingAddress'].value;

    let purchase = new Purchase();
    purchase.customer = this.checkoutForm.controls['customer'].value;
    purchase.billingAddress = billingAddress;

    purchase.shippingAddress = shippingAddress;

    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log('purchase', purchase);

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (resp: any) => {
        console.log('resp = ', resp);
        this.router.navigate(['/shop/order-placed', resp.orderTrackingNumber]);
        this.clearCart();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      },
    });
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartService.clearCart();
  }

  getStatesForCountry(formGroup: string): void {
    const fg = this.checkoutForm.get(formGroup);
    const countryName = fg?.value.country;
    const states = this.countries.find(x => x.name === countryName)!.states;
    if (formGroup === 'billingAddress') {
      this.billingAddressStates = states;
    } else {
      this.shippingAddressStates = states;
    }
    fg!.get('state')!.setValue(states[0].name);
  }
}
