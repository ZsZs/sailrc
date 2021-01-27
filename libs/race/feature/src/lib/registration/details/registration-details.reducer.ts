import { Registration } from '@sailrc/race/domain';
import { updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

export const validateRegistraionDetailsForm = updateGroup<Registration>({
  sailNumber: validate( required ),
  boatName: validate( required ),
  boatClass: validate( required ),
  skipper: validate( required )
});
