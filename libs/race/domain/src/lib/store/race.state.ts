import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Race } from '../domain/race';
import { Registration } from '../domain/registration';

export const DOMAIN_NAME = 'raceDomain';

export interface IRaceDomainState {
  race: IEntityState<Race>;
  registration: IEntityState<Registration>;
}

const domainSelector = createFeatureSelector<IRaceDomainState>( DOMAIN_NAME );

export const { initialState: initialRaceState, facade: RaceFacadeBase } = buildFeatureState( Race, DOMAIN_NAME, domainSelector );

export function raceEntityState( state = initialRaceState ): IEntityState<Race> {
  return state;
}

export const { initialState: initialRegistrationState, facade: RegistrationFacadeBase } = buildFeatureState( Registration, DOMAIN_NAME, domainSelector );

export function registrationEntityState( state = initialRegistrationState ): IEntityState<Registration> {
  return state;
}

export const raceDomainReducer: ActionReducerMap<IRaceDomainState> = {
  race: raceEntityState,
  registration: registrationEntityState
};

export const getRaceDomainState = createFeatureSelector<IRaceDomainState>( 'raceDomain' );
export const getRaceById = ( id: number ) => createSelector( getRaceDomainState, state => {
  return state.race.entities[id]
});
export const getRegistrationById = ( id: string ) => createSelector( getRaceDomainState, state => {
  return state.registration.entities[id];
});
