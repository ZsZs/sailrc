import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { getActiveTabs, getCurrentTab, getIsActiveTab, UiState } from '../store/ui.reducer';
import { tabIsActive, tabIsInActive } from '../store/ui.actions';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveTabService {

  constructor( private store: Store<UiState>) {}

  activeTabs(): Observable<string[]> {
    return this.store.select( getActiveTabs );
  }

  currentTab(): Observable<string> {
    return this.store.select( getCurrentTab );
  }

  isTabActive( tabName: string ): Observable<boolean> {
    return this.store.select( getIsActiveTab( tabName ));
  }

  tabIsActive( tabName: string ) {
    this.store.dispatch( tabIsActive({tabName }));
  }

  tabIsInActive( tabName: string ) {
    this.store.dispatch( tabIsInActive({tabName }));
  }
}
