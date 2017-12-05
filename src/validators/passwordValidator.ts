import { FormControl } from '@angular/forms';

export class passwordValidator {
    static isValid(control : FormControl)
    {
        const re = /^[A­Za­z0­9!@#$%^&*()_ ]{6,20}$/
            .test(control.value);

        if(re)
            return null;
    }
}
