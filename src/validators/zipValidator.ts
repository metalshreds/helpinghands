import { FormControl } from '@angular/forms';

export class zipValidator {
  static isValid(control : FormControl)
  {
    const re = /^[\d]{5,5}$/.test(control.value);
    if(re)
      return null;
    else
      return {'invalid description' : {value : control.value}};
  }

}
