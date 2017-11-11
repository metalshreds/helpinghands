import { FormControl } from '@angular/forms';

export class nameValidator {
  static isValid(control : FormControl)
  {
    console.log("vali is ", control.value);
    const re = /^[A-Za-z]{3,20}$/.test(control.value);
    console.log("vali is ", control.value);
    if(re)
      return null;
    else
      return {'invalid name' : {value : control.value}};
  }

}
