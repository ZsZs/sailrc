import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Race } from '@sailrc/race/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { RaceFeatureFacade } from '../race-feature.facade';

@Component({
  selector: 'sailrc-race-select',
  templateUrl: './race-select.component.html',
  styleUrls: ['./race-select.component.css']
})

export class RaceSelectComponent extends BaseListComponent<Race> implements OnInit{
  @Output() closeRaceSelect = new EventEmitter<void>();
  displayedColumns = ['title', 'date', 'country', 'place'];

  constructor(
    protected raceFeatureFacade: RaceFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private router: Router,
    private subscriptionService: ComponentDestroyService
  ) {
    super( raceFeatureFacade, route, activeTabService, subscriptionService );
  }

  private static determineExecutionTabUri( raceId: string ): string {
    return 'race/' + raceId + '/lap/unknown/list';
  }

  // region life cycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.activeTabService.tabIsInActive( this.tabName );
  }
  // endregion

  // region event handling methods
  onCloseRaceSelect() {
    this.closeRaceSelect.emit();
  }
  // endregion

  // region protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    this.onCloseRaceSelect();
    return RaceSelectComponent.determineExecutionTabUri( entityId );
  }

  protected navigateToDetailsForm( raceId: string ) {
    this.onCloseRaceSelect();
    this.router.navigate( [RaceSelectComponent.determineExecutionTabUri( raceId )], {relativeTo: this.route });
  }
  // endregion
}
