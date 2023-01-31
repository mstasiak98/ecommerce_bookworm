import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../shared/services/customer.service';
import { Customer } from '../../../../core/models/customer';
import { ToastService } from '../../../../shared/services/toast.service';
import { CheckoutValidators } from '../../../../shared/validators/checkout-validators';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss'],
})
export class CustomerDialogComponent implements OnInit {
  customer: Customer;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private customerService: CustomerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.customer = this.config?.data?.customer;
    this.form = this.formBuilder.group({
      id: [this.customer.id, [Validators.required]],
      firstName: [
        this.customer.firstName,
        [Validators.required, CheckoutValidators.whitespaceValidator],
      ],
      lastName: [
        this.customer.lastName,
        [Validators.required, CheckoutValidators.whitespaceValidator],
      ],
      email: [
        this.customer.email,
        [
          Validators.required,
          Validators.email,
          CheckoutValidators.whitespaceValidator,
        ],
      ],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.customerService
      .editCustomer(this.customer.id!, this.form.value)
      .subscribe({
        next: resp => {
          this.toastService.showSuccessMessage('Customer details updated');
          this.ref.close(resp);
        },
        error: err => {
          this.toastService.showErrorMessage(err.message);
          this.form.markAllAsTouched();
        },
      });
  }
}
