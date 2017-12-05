import { FormControl } from '@angular/forms';

export class descriptionValidator {
  static isValid(control : FormControl)
  {
    const re = /^[A-Za-z0-9 !@#$%^&*()_+=,.:'";{}|<>?\/\\\[\]\-]{1,300}$/.test(control.value);
    if(re)
      return null;
    else
      return {'invalid description' : {value : control.value}};
  }

}
