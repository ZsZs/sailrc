import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouteStateService } from '@processpuzzle/shared/util';

@Component({
  selector: 'sailrc-participant-capture',
  templateUrl: './participant-capture.component.html',
  styleUrls: ['./participant-capture.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceParticipantCaptureComponent implements OnDestroy, OnInit {
  private readonly onDestroy$ = new Subject<void>();
  private readonly tabName: string

  constructor(
    private activeTabService: ActiveTabService,
    private route: ActivatedRoute,
    private routeState: RouteStateService,
  ) {
    this.tabName = 'Participant-capture';
    this.routeState.subscribeToRouteSegments( RaceParticipantCaptureComponent.name, this.route );
  }

  // region angular lifecycle hooks
  ngOnDestroy(): void {
    this.routeState.unsubscribeFromRouteSegments( RaceParticipantCaptureComponent.name );
    this.activeTabService.tabIsInActive( this.tabName );
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.activeTabService.tabIsActive( this.tabName );
  }
  // endregion
}
