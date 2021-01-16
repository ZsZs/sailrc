import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { SpinnerService } from '@processpuzzle/shared/widgets';
import { AuthFeatureFacade } from '../facade/auth-feature-facade';

@Component({
  selector: 'sailrc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: Observable<boolean>;

  constructor( private authFeatureFacade: AuthFeatureFacade, private uiService: SpinnerService ) { }

  ngOnInit() {
    this.subscribeToLoading();
    this.maxDate = new Date();
    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
  }

  onSubmit( form: NgForm ) {
    this.authFeatureFacade.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.uiService.isLoading();
  }
}
