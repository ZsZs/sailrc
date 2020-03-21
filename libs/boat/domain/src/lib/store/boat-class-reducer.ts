import { buildFeatureState, buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createFeatureSelector } from '@ngrx/store';
import { BoatClass } from '../domain/boat-class';

const FEATURE_NAME = 'boat';
export interface BoatClassState { featureEntity: IEntityState<BoatClass>; }
const featureEntityState = createFeatureSelector<BoatClassState>( FEATURE_NAME );
export const { initialState, facade: BoatClassFacadeBase, selectors } = buildFeatureState( BoatClass, FEATURE_NAME, featureEntityState );

export const {
  selectAll: allLBoatClasses,
  selectCurrentEntity: currentBoatClass,
  selectTotal: numberOfBoatClasses
} = selectors;

// A "stub" reducer is required to support AOT
export function boatClassReducer( state = initialState): IEntityState<BoatClass> {
  return state;
}
