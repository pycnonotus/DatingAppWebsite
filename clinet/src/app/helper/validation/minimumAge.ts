import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';

export function minimumAge(age: number): ValidatorFn {
  return (control: AbstractControl) => {
    return getAge(control?.value) >= age ? null : { minimumAge: true };
  };
}
function getAge(DOB) {
  var today = new Date();
  var birthDate = new Date(DOB);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
