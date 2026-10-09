import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Race, RaceFacade } from '@sailrc/race/domain';

@Component({
  selector: 'sailrc-race-statusbar',
  templateUrl: './race-statusbar.component.html',
  styleUrls: ['./race-statusbar.component.css'],
})
export class RaceStatusbarComponent implements OnInit {
  selectedRace: Observable<Race>;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private raceFacade: RaceFacade) {}

  // region angular lifecycle hooks
  ngOnInit() {
    this.retrieveSelectedRacesFromStore();
  }
  // endregion

  // region component event handling
  showRaceSelect() {
    this.sidenavToggle.emit();
  }
  // endregion

  // region protected, private helper methods
  retrieveSelectedRacesFromStore() {
    this.selectedRace = this.raceFacade.current$;
  }
  // endregion
}
