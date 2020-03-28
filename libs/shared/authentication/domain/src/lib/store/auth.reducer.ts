import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { authenticateUser, setAuthenticated, setUnauthenticated } from './auth.actions';
import { User } from '../domain/user';
import { email } from 'ngrx-forms/validation';

export interface AuthState {
   isAuthenticated: boolean;
   returnTo: string;
   user: User;
}

const initialState: AuthState = {
   isAuthenticated: false,
   returnTo: '',
   user: { userId: '', email: '' }
};

export const authReducer = createReducer(
  initialState,
  on( authenticateUser, ( state, action ) => {
    return { ...state, isAuthenticated: false, returnTo: action.returnTo };
  }),
  on( setAuthenticated, ( state, action ) => {
     return { ...state, isAuthenticated: true, user: { email: action.email, userId: action.userId } };
  }),
  on( setUnauthenticated, ( state, action ) => {
     return { ...state, isAuthenticated: false, user: { email: '', userId: '' } };
  })
);

export const getAuthState = createFeatureSelector<AuthState>( 'auth' );
export const getIsAuthenticated = createSelector( getAuthState, ( state: AuthState ) => state.isAuthenticated );
export const getRedirectTo = createSelector( getAuthState, ( state: AuthState ) => state.returnTo );

