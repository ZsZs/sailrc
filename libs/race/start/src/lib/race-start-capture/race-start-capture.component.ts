import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { Observable, Subject } from 'rxjs';
import { RouteStateService } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-race-start-capture',
  templateUrl: './race-start-capture.component.html',
  styleUrls: ['./race-start-capture.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceStartCaptureComponent implements OnDestroy, OnInit {
  private lastRouteSegment: Observable<string>;
  private readonly onDestroy$ = new Subject<void>();
  private readonly tabName: string

  constructor( private activeTabService: ActiveTabService, private route: ActivatedRoute, private routeState: RouteStateService ) {
    this.tabName = 'start-capture';
    this.lastRouteSegment = this.routeState.subscribeToRouteSegments( RaceStartCaptureComponent.name, this.route );
  }

  // region angular lifecycle hooks
  ngOnDestroy(): void {
    this.activeTabService.tabIsInActive( this.tabName );
    this.routeState.subscribeToRouteSegments( RaceStartCaptureComponent.name, this.route );
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.activeTabService.tabIsActive( this.tabName );
  }
  // endregion

}
