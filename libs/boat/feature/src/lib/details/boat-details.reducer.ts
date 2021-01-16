import { createFormGroupState, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { Boat } from '@sailrc/boat/domain';

const FORM_ID = 'Boat-Details Form';

export const INITIAL_BOAT_DETAILS_FORM_VALUE = createFormGroupState<Boat>( FORM_ID, {
  id: undefined,
  name: '',
  sailNumber: '',
  boatClass: ''
});

export const validateBoatDetailsForm = updateGroup<Boat>({
  name: validate( required ),
  sailNumber: validate( required )
//  boatClass: validate( required )
});
