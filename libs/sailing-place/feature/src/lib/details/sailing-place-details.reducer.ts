import { updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { SailingPlace } from '@sailrc/sailing-place/domain';

export const validateSailingPlaceDetailsForm = updateGroup<SailingPlace>({
  name: validate( required )
});
