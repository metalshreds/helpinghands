import { FormControl } from '@angular/forms';

export class nameValidator {
  static isValid(control : FormControl)
  {
    const re = /^[A-Za-z ]{2,20}$/.test(control.value);
    if(re)
      return null;
    else
      return {'invalid name' : {value : control.value}};
  }

}
