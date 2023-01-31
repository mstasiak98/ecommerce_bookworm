import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckoutFormService } from '../../../../shared/services/checkout-form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutValidators } from '../../../../shared/validators/checkout-validators';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-assign-state-dialog',
  templateUrl: './assign-state-dialog.component.html',
  styleUrls: ['./assign-state-dialog.component.scss'],
})
export class AssignStateDialogComponent implements OnInit {
  stateName: string;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private checkoutFormService: CheckoutFormService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      stateName: [
        '',
        [Validators.required],
        [CheckoutValidators.stateExist(this.checkoutFormService)],
      ],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const stateData = {
      name: this.form.get('stateName')!.value,
      countryId: this.config.data.country.id,
    };

    this.checkoutFormService.assignState(stateData).subscribe({
      next: (resp: any) => {
        this.ref.close(resp);
        this.toastService.showSuccessMessage('Successfully assigned a state');
      },
      error: err => {
        this.toastService.showErrorMessage('Error while assigning state');
      },
    });
  }
}
