import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeMark = {
  fromServer: (data: RaceFieldMark ): RaceFieldMark => ({...INITIAL_MARK_VALUE, ...data})
}

@Entity({modelName: 'RaceFieldMark', pluralName: 'raceFieldMarks', uriName: 'races/:RaceId/laps/:LapId/marks', transform: [initializeMark]})
export class RaceFieldMark {
  @Key id: string;
  raceId: string;
  lapId: string;
  name: string;
  lat: number;
  lng: number;
}

export const INITIAL_MARK_VALUE: RaceFieldMark = {
  id: undefined,
  raceId: undefined,
  lapId: undefined,
  name: '',
  lat: 49.1162511246032,
  lng: 10.898241232902546
}
