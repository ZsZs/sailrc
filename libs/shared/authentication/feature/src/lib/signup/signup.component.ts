import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '@sailrc/shared/authentication/domain';
import { SnackBarService, UiState, getIsLoading } from '@sailrc/shared/widgets';

@Component({
  selector: 'sailrc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: Observable<boolean>;

  constructor( private authService: AuthService, private uiService: SnackBarService, private store: Store<UiState> ) { }

  ngOnInit() {
    this.subscribeToLoading();
    this.maxDate = new Date();
    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
  }

  onSubmit( form: NgForm ) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( getIsLoading );
  }
}
