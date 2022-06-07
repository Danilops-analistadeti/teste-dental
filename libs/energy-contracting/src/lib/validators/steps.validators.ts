import { AbstractControl } from "@angular/forms";
import { CUSTOMIZATION } from '../constants/customization.constant';


export function stepsValidator(control: AbstractControl): object | null {
    if (control?.value != 0 && control?.value % 5 !== 0) {
        return {
            stepsValidator: true,
            error: CUSTOMIZATION.ERROR_SIZE_STEPS
        };
    }
    return null;
}
