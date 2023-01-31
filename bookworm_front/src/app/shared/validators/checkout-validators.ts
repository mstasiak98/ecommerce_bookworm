import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { CheckoutFormService } from '../services/checkout-form.service';
import { map, Observable } from 'rxjs';

export class CheckoutValidators {
  static whitespaceValidator(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return { onlyWhitespace: true };
    } else {
      return null;
    }
  }

  static conditionalValidator(predicate: any, validator: any) {
    return (formControl: FormControl) => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return validator(formControl);
      }
      return null;
    };
  }

  static stateExist(
    checkoutFormService: CheckoutFormService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return checkoutFormService
        .checkStateExistByName(control.value)
        .pipe(
          map((result: boolean) => (result ? { stateExists: true } : null))
        );
    };
  }
}
