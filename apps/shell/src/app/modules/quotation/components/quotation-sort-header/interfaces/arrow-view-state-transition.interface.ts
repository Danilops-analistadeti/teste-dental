import { ArrowViewState } from '../type/arrow-view-state.type';

export interface ArrowViewStateTransition {
    fromState?: ArrowViewState;
    toState: ArrowViewState;
}
