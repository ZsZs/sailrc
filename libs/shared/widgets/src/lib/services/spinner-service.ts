import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getIsLoading, UiState } from '../store/ui.reducer';
import { startLoading, stopLoading } from '../store/ui.actions';

@Injectable({ providedIn: 'root' })
export class SpinnerService {

  constructor( private store: Store<UiState>) {}

  isLoading(): Observable<boolean> {
    return this.store.select( getIsLoading );
  }

  startLoading() {
    this.store.dispatch( startLoading() );
  }

  stopLoading() {
    this.store.dispatch( stopLoading() );
  }
}
