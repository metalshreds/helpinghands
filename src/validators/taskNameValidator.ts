import { FormControl } from '@angular/forms';

export class taskNameValidator {
  static isValid(control : FormControl)
  {
    const re = /^[A-Za-z0-9 !@#$%^&*()_+=,.:'";{}|<>?\/\\\[\]\-]{2,50}$/.test(control.value);
    if(re)
      return null;
    else
      return {'invalid name' : {value : control.value}};
  }

}
