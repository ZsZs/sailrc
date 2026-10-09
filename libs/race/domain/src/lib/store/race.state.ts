import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Race } from '../domain/race';
import { Registration } from '../domain/registration';
import { Lap } from '../domain/lap';
import { Participant } from '../domain/participant';
import { RaceFieldMark } from '../domain/race-field-mark';

export const DOMAIN_NAME = 'raceDomain';

export interface IRaceDomainState {
  race: IEntityState<Race>;
  registration: IEntityState<Registration>;
  lap: IEntityState<Lap>;
  participant: IEntityState<Participant>;
  raceFieldMark: IEntityState<RaceFieldMark>;
}

const domainSelector = createFeatureSelector<IRaceDomainState>(DOMAIN_NAME);

export const { initialState: initialRaceState, facade: RaceFacadeBase } = buildFeatureState(Race, DOMAIN_NAME, domainSelector);
export function raceEntityState(state = initialRaceState): IEntityState<Race> {
  return state;
}

export const { initialState: initialRegistrationState, facade: RegistrationFacadeBase } = buildFeatureState(Registration, DOMAIN_NAME, domainSelector);
export function registrationEntityState(state = initialRegistrationState): IEntityState<Registration> {
  return state;
}

export const { initialState: initialLapState, facade: LapFacadeBase } = buildFeatureState(Lap, DOMAIN_NAME, domainSelector);
export function lapEntityState(state = initialLapState): IEntityState<Lap> {
  return state;
}

export const { initialState: initialParticipantState, facade: ParticipantFacadeBase } = buildFeatureState(Participant, DOMAIN_NAME, domainSelector);
export function participantEntityState(state = initialParticipantState): IEntityState<Participant> {
  return state;
}

export const { initialState: initialRaceFieldMarkState, facade: RaceFieldMarkFacadeBase } = buildFeatureState(RaceFieldMark, DOMAIN_NAME, domainSelector);
export function raceFieldMarkEntityState(state = initialRaceFieldMarkState): IEntityState<RaceFieldMark> {
  return state;
}

export const raceDomainReducer: ActionReducerMap<IRaceDomainState> = {
  race: raceEntityState,
  registration: registrationEntityState,
  lap: lapEntityState,
  participant: participantEntityState,
  raceFieldMark: raceFieldMarkEntityState,
};

export const getRaceDomainState = createFeatureSelector<IRaceDomainState>('raceDomain');

export const getRaceById = (id: string) => createSelector(getRaceDomainState, (state) => state.race.entities[id]);
export const getRegistrationById = (id: string) => createSelector(getRaceDomainState, (state) => state.registration.entities[id]);
export const getLapById = (id: string) => createSelector(getRaceDomainState, (state) => state.lap.entities[id]);
export const getParticipantById = (id: string) => createSelector(getRaceDomainState, (state) => state.participant.entities[id]);
export const getRaceFieldMarkById = (id: string) => createSelector(getRaceDomainState, (state) => state.raceFieldMark.entities[id]);
