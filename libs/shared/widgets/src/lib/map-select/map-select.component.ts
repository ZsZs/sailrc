import { Component, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sailrc-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MapSelectComponent {
  apiLoaded: Observable<boolean>;
  mapOptions: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  display: any;

  // region event handling methods
  onMapClick( event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }
}
