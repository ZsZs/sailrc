import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Race } from '@sailrc/race/domain';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { IRaceFeatureState } from '../store/race-feature.reducer';
import { RaceFeatureFacade } from '@sailrc/race/shared';

@Component({
  selector: 'sailrc-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceDetailsComponent extends BaseFormComponent<Race> {
  countries = ['England', 'Germany', 'Hungary', 'United States'];

  constructor(
    protected raceFeatureFacade: RaceFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IRaceFeatureState>
  ) {
    super(raceFeatureFacade, routerFacade, route, activeTabService, componentDestroyService);
  }

  // public accessors and mutators

  // protected, private helper methods
}
