import { createAction, props } from '@ngrx/store';

export const authenticateUser = createAction( '[AUTH] Authenticate User', props<{ returnTo: string }>() );
export const setAuthenticated = createAction( '[AUTH] Set Authenticated', props<{ email: string, userId: string }>() );
export const setUnauthenticated = createAction( '[AUTH] Set Unauthenticated' );
