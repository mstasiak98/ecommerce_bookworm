import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { CheckoutFormService } from '../../../../shared/services/checkout-form.service';
import { Country } from '../../../../core/models/country';
import { ToastService } from '../../../../shared/services/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { State } from '../../../../core/models/state';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.scss'],
})
export class CountryDialogComponent implements OnInit {
  form: FormGroup;
  states: FormArray;
  isSaving: boolean = false;
  isEdit: boolean = false;
  country: Country;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutForm: CheckoutFormService,
    private toastService: ToastService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      states: this.formBuilder.array([]),
    });

    this.isEdit = this.config.data?.country ?? null;
    if (this.isEdit) {
      this.country = this.config.data.country;
      this.setFormData();
    }
  }

  setFormData(): void {
    this.form.patchValue({ name: this.country.name, code: this.country.code });
    this.country.states.forEach((state: State) => {
      this.addState(state.name);
    });
  }

  stateControls(): FormArray {
    return this.form.get('states') as FormArray;
  }

  private createItem(stateName: string): FormGroup {
    return this.formBuilder.group({
      stateName: stateName,
    });
  }

  addState(stateName: string = ''): void {
    this.states = this.form.get('states') as FormArray;
    this.states.push(this.createItem(stateName));
  }

  submit(): void {
    if (this.form.invalid) return;

    const formData = this.form.value;
    formData.states = this.form
      .get('states')
      ?.value.map((x: any) => x.stateName);

    let request = this.isEdit
      ? this.checkoutForm.editCountry(this.country.id, formData)
      : this.checkoutForm.addCountry(formData);

    this.isSaving = true;
    request.subscribe({
      next: (resp: Country) => {
        this.toastService.showSuccessMessage(
          `Successfully ${this.isEdit ? 'edited' : 'added'} country`
        );
        this.isSaving = false;
        this.ref.close(resp);
      },
      error: err => {
        this.isSaving = false;
        this.toastService.showErrorMessage(err.message);
      },
    });
  }

  deleteState(i: number) {
    this.states.removeAt(i);
  }
}
