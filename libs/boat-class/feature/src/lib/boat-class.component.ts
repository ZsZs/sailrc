import { Component } from '@angular/core';
import { BaseEntityContainerComponent } from '@processpuzzle/shared/base';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-boat-class',
  templateUrl: './boat-class.component.html',
  styleUrls: ['./boat-class.component.css']
})
export class BoatClassComponent extends BaseEntityContainerComponent<BoatClass> {

  constructor( protected entityFacade: BoatClassFacade,
               protected routerFacade: RouterFacade,
               protected route: ActivatedRoute ) {
    super( entityFacade, routerFacade, route );
  }
}
