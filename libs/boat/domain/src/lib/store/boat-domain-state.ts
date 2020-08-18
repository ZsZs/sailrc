import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createFeatureSelector } from '@ngrx/store';
import { BoatClass } from '../domain/boat-class';

export const DOMAIN_NAME = 'boatDomain';
export interface IBoatClassState { boatClass: IEntityState<BoatClass>; }
const domainSelector = createFeatureSelector<IBoatClassState>( DOMAIN_NAME );
export const { initialState, facade: BoatClassFacadeBase } = buildFeatureState( BoatClass, DOMAIN_NAME, domainSelector );

// A "stub" reducer is required to support AOT
export function boatDomainState( state = initialState ): IEntityState<BoatClass> {
  return state;
}
