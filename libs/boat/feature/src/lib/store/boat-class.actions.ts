import { createAction, props } from '@ngrx/store';
import { BoatClass } from '@sailrc/boat/domain';
import { RouterUri } from '@sailrc/shared/util';

export const editBoatClass = createAction('[BOAT-CLASS] Edit boat class', props<{ boatClass: BoatClass }>() );
export const newBoatClass = createAction('[BOAT-CLASS] New boat class', props<{ boatClass: BoatClass }>() );
export const boatClassAPIError = createAction('[BOAT-CLASS] Boat class API error', props<{ error: string, redirectTo?: RouterUri }>() );
