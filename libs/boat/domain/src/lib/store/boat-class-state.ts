import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createFeatureSelector } from '@ngrx/store';
import { BoatClass } from '../domain/boat-class';

export const FEATURE_NAME = 'boatDomain';
export interface IBoatClassState { boatClass: IEntityState<BoatClass>; }
const featureSelector = createFeatureSelector<IBoatClassState>( FEATURE_NAME );
export const { initialState, facade: BoatClassFacadeBase } = buildFeatureState( BoatClass, FEATURE_NAME, featureSelector );

// A "stub" reducer is required to support AOT
export function boatClassState( state = initialState ): IEntityState<BoatClass> {
  return state;
}
