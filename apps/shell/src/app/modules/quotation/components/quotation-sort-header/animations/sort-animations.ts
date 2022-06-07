import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger, animateChild, query } from '@angular/animations';

const SORT_ANIMATION_TRANSITION = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const sortAnimations: {
    readonly arrowPosition: AnimationTriggerMetadata;
    readonly indicator: AnimationTriggerMetadata;
    readonly arrowOpacity: AnimationTriggerMetadata;
    readonly allowChildren: AnimationTriggerMetadata;
} = {

    indicator: trigger('indicator', [
        state('active-asc, asc', style({ transform: 'translateY(0px)' })),
        state('active-desc, desc', style({ transform: 'rotate(-180deg)' })),
        transition('active-asc <=> active-desc', animate(SORT_ANIMATION_TRANSITION))
    ]),

    /** Animation that controls the arrow opacity. */
    arrowOpacity: trigger('arrowOpacity', [
        state('desc-to-active, asc-to-active, active', style({ opacity: 1 })),
        state('desc-to-hint, asc-to-hint, hint', style({ opacity: .54 })),
        state('hint-to-desc, active-to-desc, desc, hint-to-asc, active-to-asc, asc, void',
            style({ opacity: 0 })),
        // Transition between all states except for immediate transitions
        transition('* => asc, * => desc, * => active, * => hint, * => void', animate('0ms')),
        transition('* <=> *', animate(SORT_ANIMATION_TRANSITION)),
    ]),

    arrowPosition: trigger('arrowPosition', [
        // Hidden Above => Hint Center
        transition('* => desc-to-hint, * => desc-to-active',
            animate(SORT_ANIMATION_TRANSITION, keyframes([
                style({ transform: 'rotate(-180deg)' }),
                style({ transform: 'translateY(0)' })
            ]))),
        // Hint Center => Hidden Below
        transition('* => hint-to-desc, * => active-to-desc',
            animate(SORT_ANIMATION_TRANSITION, keyframes([
                style({ transform: 'translateY(0)' }),
                style({ transform: 'rotate(-180deg)' })
            ]))),
        // Hidden Below => Hint Center
        transition('* => asc-to-hint, * => asc-to-active',
            animate(SORT_ANIMATION_TRANSITION, keyframes([
                style({ transform: 'translateY(25%)' }),
                style({ transform: 'translateY(0)' })
            ]))),
        // Hint Center => Hidden Above
        transition('* => hint-to-asc, * => active-to-asc',
            animate(SORT_ANIMATION_TRANSITION, keyframes([
                style({ transform: 'translateY(0)' }),
                style({ transform: 'translateY(-25%)' })
            ]))),
        state('desc-to-hint, asc-to-hint, hint, desc-to-active, asc-to-active, active',
            style({ transform: 'translateY(0)' })),
        state('hint-to-desc, active-to-desc, desc',
            style({ transform: 'rotate(-25%)' })),
        state('hint-to-asc, active-to-asc, asc',
            style({ transform: 'translateY(25%)' })),
    ]),

    allowChildren: trigger('allowChildren', [
        transition('* <=> *', [
            query('@*', animateChild(), { optional: true })
        ])
    ]),
};
