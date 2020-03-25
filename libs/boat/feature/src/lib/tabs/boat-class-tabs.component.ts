import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';

@Component({
  selector: 'sailrc-boat-class-tabs',
  templateUrl: './boat-class-tabs.component.html',
  styleUrls: ['./boat-class-tabs.component.css']
})
export class BoatClassTabsComponent implements OnDestroy, OnInit {
  selectedBoatClass: Observable<BoatClass>;
  selectedBoatClassId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private boatClassFacade: BoatClassFacade, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedBoatClassesFromStore();
    this.determineSelectedBoatClassId();
  }

  showDetails() {
    this.router.navigateByUrl( '/boat-class/' + this.selectedBoatClassId + '/details' );
  }

  // protected, private helper methods
  private determineSelectedBoatClassId() {
    this.selectedBoatClass.pipe( takeUntil( this.onDestroy )).subscribe( boatClass => {
      if ( boatClass ) {
        this.selectedBoatClassId = boatClass.id;
      } else {
        this.selectedBoatClassId = undefined;
      }
    });
  }

  private retrieveSelectedBoatClassesFromStore() {
    this.selectedBoatClass = this.boatClassFacade.current$;
  }
}
