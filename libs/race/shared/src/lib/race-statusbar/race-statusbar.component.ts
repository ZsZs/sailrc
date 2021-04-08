import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Race, RaceFacade } from '@sailrc/race/domain';

@Component({
  selector: 'sailrc-race-statusbar',
  templateUrl: './race-statusbar.component.html',
  styleUrls: ['./race-statusbar.component.css']
})
export class RaceStatusbarComponent implements OnInit {
  selectedRace: Observable<Race>;

  constructor( private raceFacade: RaceFacade ) { }

  ngOnInit() {
    this.retrieveSelectedRacesFromStore();
  }

  // protected, private helper methods
  retrieveSelectedRacesFromStore() {
    this.selectedRace = this.raceFacade.current$;
  }
}
