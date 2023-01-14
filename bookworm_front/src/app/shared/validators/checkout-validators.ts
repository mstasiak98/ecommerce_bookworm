import { FormControl, ValidationErrors } from '@angular/forms';

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
}
