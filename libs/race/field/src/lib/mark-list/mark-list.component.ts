import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Lap, LapFacade, RaceFieldMark, RaceFieldMarkFacade } from '@sailrc/race/domain';
import { RaceFieldFeatureFacade } from '../race-field-feature.facade';
import { BaseListColumnDefinition, BaseListContainerComponent } from '@processpuzzle/shared/base';
import { Observable, of, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { FormGroupState } from 'ngrx-forms';
import { ICoordinates } from '@processpuzzle/shared/widgets';

@Component({
  selector: 'sailrc-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MarkListComponent implements OnDestroy, OnInit{
  @ViewChild('baseListContainer') baseListContainer: BaseListContainerComponent<RaceFieldMark>
  formState$: Observable<FormGroupState<RaceFieldMark>>;
  isLoading$: Observable<boolean>;
  markNames = ['Leeward', 'Left corner', 'Right corner', 'Start boat', 'Start leeward port', 'Windward'];
  mapMarkers$: Observable<google.maps.Marker[]>;
  selectedMark$: Observable<RaceFieldMark>;
  selectedMarkName: string;
  private _displayedColumns = ['select', 'name', 'long', 'lat'];
  private _columnDefinitions = new Array<BaseListColumnDefinition>();
  private readonly onDestroy$ = new Subject<void>();
  private selectedLap$: Observable<Lap>;

  constructor(
    private _raceFieldFeatureFacade: RaceFieldFeatureFacade,
    private lapFacade: LapFacade,
    private raceFieldMarkFacade: RaceFieldMarkFacade
  ) {
    this.defineColumns();
    this.selectFormState();
  }

  // region angular lifecycle hooks
  ngOnDestroy(): void {
    console.log( 'About to destroy' );
    this.onDestroy$.next();
  }

  ngOnInit() {
    this.selectedLap$ = this.lapFacade.current$;
    this.selectedMark$ = this.raceFieldMarkFacade.current$;

    this.subscribeToLoading();
    this.loadAllEntities();
    this.determineMapMarkers();
  }
  // endregion

  // region event handling methods
  onMarkRaceField() {
    this.retrievePositionAndAddMark();
  }

  onRemoveMark() {
    this.selectedMark$.pipe(
      take( 1 )
    ).subscribe(
      selectedMark => this.raceFieldMarkFacade.delete( selectedMark, { raceId: selectedMark.raceId, lapId: selectedMark.lapId })
    );
  }
  // endregion

  // region protected, private helper methods
  private addRaceFieldMark( actualPosition: ICoordinates ) {
    let selectedLap: Lap;
    this.selectedLap$.pipe( take( 1 ) ).subscribe( lap => {
      selectedLap = lap;
      const newMark = new RaceFieldMark();
      newMark.name = this.selectedMarkName;
      newMark.raceId = selectedLap.raceId;
      newMark.lapId = selectedLap.id;
      newMark.lng = actualPosition.lng;
      newMark.lat = actualPosition.lat;
      this.raceFieldMarkFacade.create( newMark, { raceId: selectedLap.raceId, lapId: selectedLap.id } );
    });
  }

  private defineColumns() {
    const name: BaseListColumnDefinition = {
      matColumnDef: 'name',
      propertyName: 'name',
      label: 'Name',
      headerName: 'Name'
    };
    this._columnDefinitions.push( name );

    const longitude: BaseListColumnDefinition = {
      matColumnDef: 'long',
      propertyName: 'lng',
      label: 'Longitude',
      headerName: 'Longitude'
    };
    this._columnDefinitions.push( longitude );

    const latitude: BaseListColumnDefinition = {
      matColumnDef: 'lat',
      propertyName: 'lat',
      label: 'Latitude',
      headerName: 'Latitude'
    };
    this._columnDefinitions.push( latitude );
  }

  private determineMapMarkers() {
    this.raceFieldMarkFacade.all$.pipe(
      takeUntil( this.onDestroy$ ),
      map( raceFieldMarks => raceFieldMarks.map( raceFieldMark => {
        return new google.maps.Marker( {
          position: { lat: raceFieldMark.lat, lng: raceFieldMark.lng },
          title: raceFieldMark.name
        });
      }))).subscribe(markers => {
        this.mapMarkers$ = of( markers );
    });
  }

  private loadAllEntities() {
    this.lapFacade.current$.pipe(
      takeUntil( this.onDestroy$ ),
      tap( () => this.raceFieldMarkFacade.selectMany( [] )),
      tap( lap => this.raceFieldMarkFacade.loadAll( { raceId: lap.raceId, lapId: lap.id }))
    ).subscribe( () => this.selectedMark$ = this.raceFieldMarkFacade.current$ );
  }

  private retrievePositionAndAddMark() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        };
        this.addRaceFieldMark( currentPosition );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  protected selectFormState() {
    this.formState$ = this.raceFieldFeatureFacade.formState$;
  }

  private subscribeToLoading() {
    this.isLoading$ = this.raceFieldMarkFacade.isLoading$;
  }
  // endregion

  // region properties
  get columnDefinitions() {
    return this._columnDefinitions;
  }

  get displayedColumns() {
    return this._displayedColumns;
  }

  get raceFieldFeatureFacade() {
    return this._raceFieldFeatureFacade;
  }
  // endregion
}
