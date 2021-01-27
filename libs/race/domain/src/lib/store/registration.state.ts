import { buildFeatureState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createFeatureSelector } from '@ngrx/store';
import { Registration } from '../domain/registration';

const DOMAIN_NAME = 'registration';

// export interface IRegistrationState { registration: IEntityState<Registration>; }

// const domainSelector = createFeatureSelector<IRegistrationState>( DOMAIN_NAME );

// export const { initialState, facade: RegistrationFacadeBase } = buildFeatureState( Registration, DOMAIN_NAME, domainSelector );

// export function registrationDomainState( state = initialState ): IEntityState<Registration> {
//  return state;
//}
