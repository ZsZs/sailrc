import { Observable } from 'rxjs';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { Store } from '@ngrx/store';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { Component, OnInit } from '@angular/core';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { SailorFeatureFacade } from '../sailor-feature.facade';
import { ISailorFeatureState } from '../store/sailor-feature.reducer';

@Component({
  selector: 'sailrc-sailor-details',
  templateUrl: './sailor-details.component.html',
  styleUrls: ['./sailor-details.component.css']
})
export class SailorDetailsComponent extends BaseFormComponent<Sailor> implements OnInit {
  yachtClubs$: Observable<YachtClub[]>;

  constructor(
    protected sailorFacade: SailorFacade,
    private yachtClubFacade: YachtClubFacade,
    protected sailorFeatureFacade: SailorFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<ISailorFeatureState>,
  ) {
    super( sailorFacade, sailorFeatureFacade, routerFacade, route, activeTabService, componentDestroyService, 'boat-details' );
  }

  // event handling methods
  ngOnInit() {
    super.ngOnInit();
    this.yachtClubFacade.loadAll();
    this.yachtClubs$ = this.yachtClubFacade.all$;
  }

  // public accessors and mutators

  // protected, private helper methods
}
