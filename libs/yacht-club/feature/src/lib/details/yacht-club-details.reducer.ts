import { createFormGroupState, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { YachtClub } from '@sailrc/yacht-club/domain';

const FORM_ID = 'Yacht-Club-Details Form';

// export const INITIAL_YACHT_CLUB_DETAILS_FORM_VALUE = createFormGroupState<YachtClub>( FORM_ID, {
//   id: undefined,
//   name: ''
// });

export const validateYachtClubDetailsForm = updateGroup<YachtClub>({
  name: validate( required )
});
