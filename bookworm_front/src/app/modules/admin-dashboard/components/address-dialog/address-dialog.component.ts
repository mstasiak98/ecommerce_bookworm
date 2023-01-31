import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { Address } from '../../../../core/models/address';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { CheckoutFormService } from '../../../../shared/services/checkout-form.service';
import { Country } from '../../../../core/models/country';
import { State } from '../../../../core/models/state';
import { AddressService } from '../../../../shared/services/address.service';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss'],
})
export class AddressDialogComponent implements OnInit {
  form: FormGroup;
  address: Address;
  countries: Country[] = [];
  states: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private toastService: ToastService,
    private checkoutFormService: CheckoutFormService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.listCountries();
    this.address = this.config?.data?.address;

    this.form = this.formBuilder.group({
      id: [this.address.id],
      state: [this.address.state, [Validators.required]],
      city: [this.address.city, [Validators.required]],
      country: [this.address.country, [Validators.required]],
      street: [this.address.street, [Validators.required]],
      zipCode: [this.address.zipCode, [Validators.required]],
    });
  }

  private listCountries(): void {
    this.checkoutFormService.getCountries().subscribe(data => {
      this.countries = data;
      this.states = this.countries.find(
        x => x.name === this.address.country
      )!.states;
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('test', this.form.value);
    this.addressService
      .changeAddress(this.address.id!, this.form.value)
      .subscribe({
        next: resp => {
          this.toastService.showSuccessMessage('Address updated');
          this.ref.close(resp);
        },
        error: err => {
          this.toastService.showErrorMessage(err.message);
        },
      });
  }

  changedCountry(event: any) {
    this.states = this.countries.find(x => x.name === event.value)!.states;
    this.form.get('state')?.reset();
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();
  }
}
