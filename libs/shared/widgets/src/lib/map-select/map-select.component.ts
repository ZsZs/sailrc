import { Component, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMapsService } from '../services/google-maps-service';
import { GoogleMap } from '@angular/google-maps';
import { ICoordinates } from './coordinates';

@Component({
  selector: 'sailrc-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MapSelectComponent implements OnChanges {
  apiLoaded: boolean;
  center: ICoordinates = { lat: 49, lng: 10 };
  @Input() disableAddMarker = false;
  display: any;
  @ViewChild('googleMap') googleMap: GoogleMap;
  mapOptions: google.maps.MapOptions = { center: { lat: 49, lng: 10.11 }, zoom: 4 };
  markerOptions: google.maps.MapOptions = { draggable: false };
  @Input() mapMarkers: google.maps.Marker[];
  zoom = 4;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: any) => void = () => {};

  constructor(private googleMapsService: GoogleMapsService) {}

  // region Angular lifecycle event hooks
  ngOnChanges(): void {
    this.calculateCenter();
  }
  // endregion

  // region event handling methods
  onMapClick(event: google.maps.MapMouseEvent) {
    if (!this.disableAddMarker) {
      const marker = this.addMarker(event.latLng.toJSON());
      this.calculateCenter();
      this._onChange(marker);
    }
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }
  // endregion

  // region public accessors and mutators
  addMarker(value: ICoordinates) {
    if (!this.mapMarkers) this.mapMarkers = [];
    const marker = new google.maps.Marker({ position: { lng: value.lng, lat: value.lat } });
    this.mapMarkers.push(marker);
    return marker;
  }

  public registerOnChange(fn: (value) => void) {
    this._onChange = fn;
  }
  // endregion

  // region protected, private helper methods
  private calculateCenter() {
    if (this.googleMap && this.mapMarkers && this.mapMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      this.mapMarkers.forEach((markerPosition) => {
        const position = new google.maps.LatLng(markerPosition.getPosition().lat(), markerPosition.getPosition().lng());
        bounds.extend(position);
      });
      this.googleMap.fitBounds(bounds);
    }
  }
  // endregion
}
