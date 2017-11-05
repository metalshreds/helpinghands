import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

export class emailValidator {
    static isValid(control : FormControl)
    {
        const re = /^([\w­]+(?:\.[\w­]+)*)@(wisc.edu){1}$/i.test(control.value);
        if(re)
            return null;
        else
            return {'invalid email address' : {value : control.value}};
    }
    /*
    static emailformat() : ValidatorFn{
      return (control : AbstractControl):{[key :string] : any} => {
        var email = /^([\w­]+(?:\.[\w­]+)*)@((?:[\w­]+\.)(wisc.edu){1})$/i;
        const bad = email.test(control.value);
        console.log("bad is ", bad);
        console.log("value is", control.value);
        return bad ? null : {'invalid email address' : {value : control.value}};
      }
    }
    */
}
