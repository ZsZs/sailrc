import { updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { Sailor } from '@sailrc/sailor/domain';

export const validateSailorDetailsForm = updateGroup<Sailor>({
  firstName: validate( required ),
  lastName  : validate( required )
});
