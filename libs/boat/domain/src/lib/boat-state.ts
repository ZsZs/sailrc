import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { Boat, INITIAL_BOAT_VALUE } from './boat';

export const DOMAIN_NAME = 'boatDomain';
export interface IBoatState { boat: IEntityState<Boat>; }

const domainSelector = createFeatureSelector<IBoatState>( DOMAIN_NAME );

export const { initialState, facade: BoatFacadeBase } = buildFeatureState( Boat, DOMAIN_NAME, domainSelector, INITIAL_BOAT_VALUE );

export function boatDomainState( state = initialState ): IEntityState<Boat> {
  return state;
}

export const boatDomainReducer: ActionReducerMap<IBoatState> = {
  boat: boatDomainState
};

export const getBoatDomainState = createFeatureSelector<IBoatState>( DOMAIN_NAME );
export const getBoatById = ( id: string ) => createSelector( getBoatDomainState, state => state.boat.entities[id] );
