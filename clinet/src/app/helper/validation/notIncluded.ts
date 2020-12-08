import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';

export function notIncluded(includeArray: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    return !includeArray.includes(control?.value) ? null : { included: true };
  };
}
