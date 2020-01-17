import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { getIsLoading, UiState } from '../store/ui.reducer';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../store/ui.actions';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
   loadingStateChanged = new Subject<boolean>();

   constructor( private snackbar: MatSnackBar, private store: Store<UiState>) {}

   showSnackbar( message, action, duration ) {
      this.snackbar.open( message, action, { duration });
   }
}
