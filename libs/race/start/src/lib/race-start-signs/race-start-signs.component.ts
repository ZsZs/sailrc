import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Lap, LapFacade, StartSignals } from '@sailrc/race/domain';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NGXLogger } from 'ngx-logger';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import deepEqual from 'deep-equal';

@Component({
  selector: 'sailrc-race-start-signs',
  templateUrl: './race-start-signs.component.html',
  styleUrls: ['./race-start-signs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceStartSignsComponent implements OnDestroy, OnInit{
  private currentLap: Lap;
  durationInSeconds = 5;
  private readonly onDestroy$ = new Subject<void>();
  startProgress = 0;
  startSignName: string;

  constructor( private _snackBar: MatSnackBar, private logger: NGXLogger, private lapFacade: LapFacade ) {}
  // region angular lifecycle hooks
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.subscribeToCurrentLapChanges();
  }
  // endregion

  // region public accessors
  onRecall() {
    this.startProgress = 0;
  }

  onStartSignalEvent( $event: StartSignals ) {
    switch( $event ) {
      case StartSignals.WarnSignal:
        this.warnSignal();
        break;
      case StartSignals.PreparatorySignalI:
        this.preparatorySignalI();
        break;
      case StartSignals.OneMinuteSignal:
        this.oneMinuteSignal();
        break;
      case StartSignals.StartSignal:
        this.startSignal();
        break;
      case StartSignals.RecallSignal:
        this.recallSignal();
        break;
      default:
        throw new Error( `Unknown Start Signal Event: ${ $event }`);
    }
  }
  // endregion

  // region protected, private helper methods
  private notifyUser(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  private oneMinuteSignal() {
    this.startProgress = 4;
    this.startSignName = 'One Minute';
    this.notifyUser('One minute signal.', '1 Minutes');
  }

  private preparatorySignalI() {
    this.startProgress = 2;
    this.startSignName = 'Preparatory signal I.';
    this.notifyUser('Preparatory signal I.', '4 Minutes');
  }

  private recallSignal() {
    // do nothing yet
  }

  private startSignal() {
    this.startProgress = 5;
    this.startSignName = 'Start';
    this.notifyUser('Start signal.', '0 Minutes');
  }

  private warnSignal() {
    this.startProgress = 1;
    this.startSignName = 'Warning';
    this.notifyUser('Warn signal', '5 Minutes');
  }

  private subscribeToCurrentLapChanges() {
    this.lapFacade.current$
      .pipe(
        takeUntil(this.onDestroy$),
        map((lap) => {
          if( !deepEqual( this.currentLap, lap )) {
            this.currentLap = lap;
            this.updateComponentFromLap(lap);
          }
        })
      ).subscribe();
  }

  private updateComponentFromLap( lap: Lap ) {
    this.logger.debug( `Update race-start-signs.component from lap: ${JSON.stringify( lap )}` );
  }
  // endregion
}
