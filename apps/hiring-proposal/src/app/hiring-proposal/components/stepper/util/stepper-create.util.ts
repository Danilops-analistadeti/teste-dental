import {
    STEPPER_NUMBER_ENERGY,
    STEPPER_NUMBER_CUSTOMIZATION,
    STEPPER_NUMBER_FINANCIAL,
    STEPPER_NUMBER_REGISTRATION,
    DISABLED,
} from '../../../constant/stepper.constant';


export function initStepperControls(): Map<number, boolean> {
    return new Map<number, boolean>([
        [STEPPER_NUMBER_ENERGY, !DISABLED],
        [STEPPER_NUMBER_CUSTOMIZATION, DISABLED],
        [STEPPER_NUMBER_FINANCIAL, DISABLED],
        [STEPPER_NUMBER_REGISTRATION, DISABLED],
    ]);
}