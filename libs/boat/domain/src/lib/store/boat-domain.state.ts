import { ActionReducerMap } from '@ngrx/store';
import { boatClassState, IBoatClassState } from './boat-class-state';

export type BoatClassState = IBoatClassState;

export const boatDomainReducer: ActionReducerMap<BoatClassState> = {
  boatClass: boatClassState,
};
