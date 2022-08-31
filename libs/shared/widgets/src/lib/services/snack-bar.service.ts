import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiState } from '../../../../base/src/lib/store/ui.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
   loadingStateChanged = new Subject<boolean>();

   constructor( private snackbar: MatSnackBar, private store: Store<UiState>) {}

   showSnackbar( message, action, duration ) {
      this.snackbar.open( message, action, { duration });
   }
}
