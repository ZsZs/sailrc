import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { Boat } from '@sailrc/boat/domain';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Sailor } from '../domain/sailor';

export const DOMAIN_NAME = 'sailorDomain';
export interface ISailorState { sailor: IEntityState<Sailor>; }

const domainSelector = createFeatureSelector<ISailorState>( DOMAIN_NAME );

export const { initialState, facade: SailorFacadeBase } = buildFeatureState( Sailor, DOMAIN_NAME, domainSelector );

export function sailorDomainState( state = initialState ): IEntityState<Sailor> {
  return state;
}

export const sailorDomainReducer: ActionReducerMap<ISailorState> = {
  sailor: sailorDomainState
};

export const getSailorDomainState = createFeatureSelector<ISailorState>( DOMAIN_NAME );
export const getSailorById = ( id: number ) => createSelector( getSailorDomainState, state => state.sailor.entities[id] );
