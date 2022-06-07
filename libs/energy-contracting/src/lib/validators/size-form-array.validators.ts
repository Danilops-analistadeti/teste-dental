import { FormArray } from "@angular/forms";
import { CUSTOMIZATION } from "../constants/customization.constant";


export function sizeFormArrayValidator(arr: FormArray): object | null {
    return !arr.controls.some(item => item.value) ? {
        invalidSize: true,
        error: CUSTOMIZATION.ERROR_SIZE_FINANCIAL_GUARANTEE
    } : null;
}
