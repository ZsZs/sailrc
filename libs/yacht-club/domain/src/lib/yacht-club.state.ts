import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { YachtClub } from './yacht-club';

export const DOMAIN_NAME = 'yachtClubDomain';
export interface IYachtClubState { yachtClub: IEntityState<YachtClub>; }

const domainSelector = createFeatureSelector<IYachtClubState>( DOMAIN_NAME );

export const { initialState, facade: YachtClubFacadeBase } = buildFeatureState( YachtClub, DOMAIN_NAME, domainSelector );

export function yachtClubDomainState( state = initialState ): IEntityState<YachtClub> {
  return state;
}

export const yachtClubDomainReducer: ActionReducerMap<IYachtClubState> = {
  yachtClub: yachtClubDomainState
};

export const getYachtClubDomainState = createFeatureSelector<IYachtClubState>( DOMAIN_NAME );
export const getYachtClubById = ( id: string ) => createSelector( getYachtClubDomainState, state => state.yachtClub.entities[id] );
