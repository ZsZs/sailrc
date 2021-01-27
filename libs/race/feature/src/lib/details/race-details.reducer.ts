import { validate, updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { Race } from '@sailrc/race/domain';

export const validateRaceDetailsForm = updateGroup<Race>({
  title: validate( required ),
  fromDate: validate( required ),
  toDate: validate( required ),
  country: validate( required ),
  place: validate( required ),
  state: validate( required )
});
