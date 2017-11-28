import { FormControl } from '@angular/forms';

export class passwordValidator {
    static isValid(control : FormControl)
    {
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        const re = /^[0-9a-zA-Z]{6,10}$/
            .test(control.value);
        console.log("password is ", control.value, "match is ", re);
        if(re)
            return null;
        else
            return {'invalid password' : {value : control.value}};
    }
}