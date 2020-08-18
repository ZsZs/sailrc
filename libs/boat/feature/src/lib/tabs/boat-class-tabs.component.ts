import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { BaseTabsComponent, BaseUrlSegments } from '@sailrc/shared/base';
import { RouterFacade } from '@sailrc/shared/util';
import { ActiveTabService } from '@sailrc/shared/widgets';

@Component({
  selector: 'sailrc-boat-class-tabs',
  templateUrl: './boat-class-tabs.component.html',
  styleUrls: ['./boat-class-tabs.component.css']
})
export class BoatClassTabsComponent extends BaseTabsComponent<BoatClass> {

  constructor( protected boatClassFacade: BoatClassFacade, protected routerFacade: RouterFacade, protected activeTabService: ActiveTabService ) {
    super( boatClassFacade, activeTabService, routerFacade );
  }

  // protected, private helper methods
}
