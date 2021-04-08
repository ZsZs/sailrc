import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'sailrc-race-lap-toolbar',
  templateUrl: './race-lap-toolbar.component.html',
  styleUrls: ['./race-lap-toolbar.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceLapToolbarComponent {
  @Input() lastUrlSegment: string;

  constructor( public mediaObserver: MediaObserver ) {}
}
