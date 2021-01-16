import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { BoatFacade } from '../../../../domain/src/lib/boat-facade';

@Component({
  selector: 'sailrc-boat-tabs',
  templateUrl: './boat-tabs.component.html',
  styleUrls: ['./boat-tabs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatTabsComponent extends BaseTabsComponent<Boat>{
  constructor(
    protected boatFacade: BoatFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute ) {
    super( boatFacade, activeTabService, routerFacade, route );
  }

  // protected, private helper methods
}
