import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { INITIAL_SAILING_PLACE_VALUE, SailingPlace } from './sailing-place';

export const DOMAIN_NAME = 'sailingPlaceDomain';
export interface ISailingPlaceState { sailingPlace: IEntityState<SailingPlace>; }

const domainSelector = createFeatureSelector<ISailingPlaceState>( DOMAIN_NAME );

export const { initialState, facade: SailingPlaceFacadeBase } = buildFeatureState( SailingPlace, DOMAIN_NAME, domainSelector, INITIAL_SAILING_PLACE_VALUE );

export function sailingPlaceDomainState( state = initialState ): IEntityState<SailingPlace> {
  return state;
}

export const sailingPlaceDomainReducer: ActionReducerMap<ISailingPlaceState> = {
  sailingPlace: sailingPlaceDomainState
};

export const getSailingPlaceDomainState = createFeatureSelector<ISailingPlaceState>( DOMAIN_NAME );
export const getSailingPlaceById = ( id: string ) => createSelector( getSailingPlaceDomainState, state => state.sailingPlace.entities[id] );
