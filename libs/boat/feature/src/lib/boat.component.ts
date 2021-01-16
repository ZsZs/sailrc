import { Component, ViewEncapsulation } from '@angular/core';
import { BaseEntityContainerComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { BoatFacade } from '@sailrc/boat/domain';

@Component({
  selector: 'sailrc-boat-detail',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatComponent extends BaseEntityContainerComponent<Boat>{

  constructor( protected entityFacade: BoatFacade,
               protected routerFacade: RouterFacade,
               protected route: ActivatedRoute ) {
    super( entityFacade, routerFacade, route );
  }
}
