import { createAction, props } from '@ngrx/store';

export const authenticateUser = createAction( '[AUTH] Authenticate User', props<{ returnTo: string }>() );
export const setAuthenticated = createAction( '[AUTH] Set Authenticated' );
export const setUnauthenticated = createAction( '[AUTH] Set Unauthenticated' );
