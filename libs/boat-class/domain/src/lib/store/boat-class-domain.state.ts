import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { BoatClass } from '../domain/boat-class';

export const DOMAIN_NAME = 'boatClassDomain';

export interface IBoatClassState { boatClass: IEntityState<BoatClass>; }

const domainSelector = createFeatureSelector<IBoatClassState>( DOMAIN_NAME );

export const { initialState, facade: BoatClassFacadeBase } = buildFeatureState( BoatClass, DOMAIN_NAME, domainSelector );

// A "stub" reducer is required to support AOT
export function boatClassDomainState( state = initialState ): IEntityState<BoatClass> {
  return state;
}

export const boatClassDomainReducer: ActionReducerMap<IBoatClassState> = {
  boatClass: boatClassDomainState
};

export const getBoatClassDomainState = createFeatureSelector<IBoatClassState>( DOMAIN_NAME );
export const getBoatClassById = ( id: string ) => createSelector( getBoatClassDomainState, state => state.boatClass.entities[id] );
