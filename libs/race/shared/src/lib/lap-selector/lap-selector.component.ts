import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Lap, LapFacade, RaceFacade } from '@sailrc/race/domain';

@Component({
  selector: 'sailrc-lap-selector',
  templateUrl: './lap-selector.component.html',
  styleUrls: ['./lap-selector.component.css']
})

export class LapSelectorComponent implements OnDestroy, OnInit {
  @Input() lastUrlSegment: string;
  numberOfLaps = 0;
  numberOfLapsSubscription: Subscription;
  selectedLap: Lap;
  selectedLapSubscription: Subscription;

  constructor( private raceFacade: RaceFacade, private lapFacade: LapFacade, private router: Router, private route: ActivatedRoute ) { }

  // region component lifecycle handling methods
  ngOnDestroy(): void {
    this.numberOfLapsSubscription.unsubscribe();
    this.selectedLapSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadLaps();
    this.subscribeToNumberOfLaps();
    this.subscribeToSelectedLap();
  }
  // endregion

  // region event handling methods
  addLap() {
    const newLap = new Lap();
    this.raceFacade.current$.pipe(
      first(),
      map( race => {
        newLap.raceId = race.id;
        newLap.index = this.numberOfLaps + 1;
        this.lapFacade.create( newLap, race.id );
        this.changeSelectedLap( newLap.index );
      })
    ).subscribe();
  }

  canNext() {
    return this.selectedLap ? this.selectedLap.index < this.numberOfLaps : false;
  }

  canPrevious() {
    return this.selectedLap ? this.selectedLap.index > 1 : false;
  }

  nextLap() {
    if ( this.canNext() ) {
      const newLapIndex = this.selectedLap.index + 1;
      this.changeSelectedLap( newLapIndex );
    }
  }

  previousLap() {
    if ( this.canPrevious() ) {
      const newLapIndex = this.selectedLap.index - 1;
      this.changeSelectedLap( newLapIndex );
    }
  }

  deleteLap() {
    console.log( 'should delete lap' );
  }
  // endregion

  // protected, private helper methods
  private changeSelectedLap( index: number ) {
    this.lapFacade.all$.pipe(
      map( laps => laps.filter( lap => lap.index == index )),
      take( 1 )
    ).subscribe( laps => {
      this.lapFacade.select( laps[0] );
    });
  }

  private loadLaps() {
    this.raceFacade.current$.pipe(
      first(),
      tap( race => {
        this.lapFacade.loadAll( race.id );
      })
    ).subscribe();
  }

  private subscribeToNumberOfLaps() {
    this.numberOfLapsSubscription = this.lapFacade.total$.subscribe( count => {
      this.numberOfLaps = count;
      if ( this.numberOfLaps > 0 ) {
        this.changeSelectedLap( 1 );
      }
    });
  }

  private subscribeToSelectedLap() {
    this.selectedLapSubscription = this.lapFacade.current$.subscribe( lap => {
      if ( lap ) {
        this.selectedLap = lap;
        this.updateLapIndexInRoute();
      }
    });
  }

  private updateLapIndexInRoute() {
    const urlFragment = this.lastUrlSegment ? '/' + this.lastUrlSegment : '';
    if ( this.selectedLap ) {
      this.router.navigate( ['race/' + this.selectedLap.raceId + '/lap/' + this.selectedLap.index + urlFragment], {relativeTo: this.route } );
    }
  }
}
