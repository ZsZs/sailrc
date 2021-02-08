import { Component, ViewEncapsulation } from '@angular/core';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { SailingPlace, SailingPlaceFacade } from '@sailrc/sailing-place/domain';
import { BaseEntityContainerComponent } from '@processpuzzle/shared/base';

@Component({
  selector: 'sailrc-sailing-place',
  templateUrl: './sailing-place.component.html',
  styleUrls: ['./sailing-place.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SailingPlaceComponent extends BaseEntityContainerComponent<SailingPlace>{

  constructor( protected entityFacade: SailingPlaceFacade,
               protected routerFacade: RouterFacade,
               protected route: ActivatedRoute
  ) {
    super( entityFacade, routerFacade, route );
  }
}
