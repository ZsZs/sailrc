import { createFormGroupState, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { BoatClass } from '@sailrc/boat-class/domain';
import { INITIAL_BOAT_CLASS_VALUE } from '@sailrc/boat-class/domain';

const BOAT_CLASS_DETAILS_FORM_ID = 'Boat-Class-Details Form';

export const INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE = createFormGroupState<BoatClass>( BOAT_CLASS_DETAILS_FORM_ID, INITIAL_BOAT_CLASS_VALUE );

export const validateBoatClassDetailsForm = updateGroup<BoatClass>({
  name: validate( required ),
  yardstick: validate( required )
});
