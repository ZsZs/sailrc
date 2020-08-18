import { ActionReducerMap } from '@ngrx/store';
import { boatDomainState, IBoatClassState } from './boat-domain-state';

export type BoatClassState = IBoatClassState;

export const boatDomainReducer: ActionReducerMap<BoatClassState> = {
  boatClass: boatDomainState
};
