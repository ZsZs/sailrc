import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { authenticateUser, setAuthenticated, setUnauthenticated } from './auth.actions';

export interface AuthState {
   isAuthenticated: boolean;
   returnTo: string;
}

const initialState: AuthState = {
   isAuthenticated: false,
   returnTo: undefined
};

export const authReducer = createReducer(
  initialState,
  on( authenticateUser, ( state, action ) => {
    return { ...state, isAuthenticated: false, returnTo: action.returnTo };
  }),
  on( setAuthenticated, ( state, action ) => {
     return { ...state, isAuthenticated: true };
  }),
  on( setUnauthenticated, ( state, action ) => {
     return { ...state, isAuthenticated: false };
  })
);

export const getAuthState = createFeatureSelector<AuthState>( 'auth' );
export const getIsAuthenticated = createSelector( getAuthState, ( state: AuthState ) => state.isAuthenticated );
export const getRedirectTo = createSelector( getAuthState, ( state: AuthState ) => state.returnTo );

