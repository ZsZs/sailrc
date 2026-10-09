import { Registration } from '@sailrc/race/domain';
import { updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

export const validateRegistrationDetailsForm = updateGroup<Registration>({
  displayName: validate(required),
  boatId: validate(required),
  sailorId: validate(required),
});
