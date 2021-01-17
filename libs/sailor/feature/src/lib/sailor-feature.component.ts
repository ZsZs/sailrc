import { Component } from '@angular/core';
import { BaseEntityContainerComponent } from '@processpuzzle/shared/base';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-sailor-feature',
  templateUrl: './sailor-feature.component.html',
  styleUrls: ['./sailor-feature.component.css']
})
export class SailorFeatureComponent extends BaseEntityContainerComponent<Sailor> {

  constructor( protected entityFacade: SailorFacade,
               protected routerFacade: RouterFacade,
               protected route: ActivatedRoute ) {
    super( entityFacade, routerFacade, route );
  }
}
