import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'sailrc-race-lap-toolbar',
  templateUrl: './race-lap-toolbar.component.html',
  styleUrls: ['./race-lap-toolbar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RaceLapToolbarComponent {
  @Input() lastUrlSegment: string;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(public mediaObserver: MediaObserver) {}

  // region component event handling
  showRaceSelect() {
    this.sidenavToggle.emit();
  }
  // endregion
}
