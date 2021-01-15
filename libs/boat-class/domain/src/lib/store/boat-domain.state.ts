import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { BoatClass } from '../domain/boat-class';

export const DOMAIN_NAME = 'boatDomain';
export type BoatClassState = IBoatClassState;
export interface IBoatClassState { boatClass: IEntityState<BoatClass>; }

const domainSelector = createFeatureSelector<IBoatClassState>( DOMAIN_NAME );

export const { initialState, facade: BoatClassFacadeBase } = buildFeatureState( BoatClass, DOMAIN_NAME, domainSelector );

// A "stub" reducer is required to support AOT
export function boatDomainState( state = initialState ): IEntityState<BoatClass> {
  return state;
}

export const boatDomainReducer: ActionReducerMap<BoatClassState> = {
  boatClass: boatDomainState
};

export const getBoatClassDomainState = createFeatureSelector<BoatClassState>( DOMAIN_NAME );
export const getBoatClassById = ( id: number ) => createSelector( getBoatClassDomainState, state => state.boatClass.entities[id] );
