import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { logger } from 'codelyzer/util/logger';
import { Observable } from 'rxjs';
import { SpinnerService } from '@sailrc/shared/widgets';
import { Store } from '@ngrx/store';

@Component({
  selector: 'sailrc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  isLoading: Observable<boolean>;
  private isOn = false;

  constructor( private ngxLogger: NGXLogger, private spinnerService: SpinnerService ) {}

  // Event handling methods
  ngOnDestroy(): void {
    this.ngxLogger.info( 'SailRC is about to stop.' );
  }

  ngOnInit(): void {
    this.ngxLogger.info( 'SailRC is about to start.' );
    this.subscribeToLoading();
  }

  onToggleSpinner() {
    this.isOn = this.isOn ? false : true;
    this.isOn ? this.spinnerService.startLoading() : this.spinnerService.stopLoading();
  }

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.spinnerService.isLoading();
  }
}
