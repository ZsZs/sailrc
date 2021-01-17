import { updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { Boat } from '@sailrc/boat/domain';

export const validateBoatDetailsForm = updateGroup<Boat>({
  name: validate( required ),
  sailNumber: validate( required ),
  boatClass: validate( required )
});
