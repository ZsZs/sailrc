import { Component, EventEmitter, Output } from '@angular/core';
import { Race } from '@sailrc/race/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { SelectionModel } from '@angular/cdk/collections';
import { RaceFeatureFacade } from '../race-feature.facade';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sailrc-race-select',
  templateUrl: './race-select.component.html',
  styleUrls: ['./race-select.component.css']
})

export class RaceSelectComponent extends BaseListComponent<Race> {
  @Output() closeRaceSelect = new EventEmitter<void>();
  displayedColumns = ['title', 'date', 'country', 'place'];

  constructor(
    protected raceFeatureFacade: RaceFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService,
    private router: Router
  ) {
    super( raceFeatureFacade, route, activeTabService, subscriptionService  );
    this.selection = new SelectionModel<Race>(false, []);
  }

  // region event handling methods
  onCancel(): void {
    this.router.navigateByUrl( '/' );
  }

  onCloseRaceSelect() {
    this.closeRaceSelect.emit();
  }

  onOk(): void {
    this.onCloseRaceSelect();
    this.navigateToExecutionTab( this.selection.selected[0].id );
  }
  // endregion

  // region protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    this.onCloseRaceSelect();
    return this.determineExecutionTabUri( entityId );
  }

  private determineExecutionTabUri( raceId: string ): string {
    return 'race-execution/' + raceId + '/lap/unknown/participants';
  }

  private navigateToExecutionTab( raceId: string ) {
    this.router.navigateByUrl( this.determineExecutionTabUri( raceId ));
  }
  // endregion
}
