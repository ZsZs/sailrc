import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SpinnerService, UiState } from '@processpuzzle/shared/widgets';
import { AuthFeatureFacade } from '../facade/auth-feature-facade';

@Component({
  selector: 'sailrc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: Observable<boolean>;
  private redirectTo: string;

  constructor( private authService: AuthFeatureFacade, private spinnerService: SpinnerService, private store: Store<UiState>, private activatedRoute: ActivatedRoute, private router: Router ) {}

  ngOnInit() {
    this.subscribeToLoading();
    this.buildLoginForm();
    this.determineRedirect();
  }

  onSubmit( ) {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  // protected, private helper methods
  private buildLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl( '', {validators: [ Validators.required, Validators.email ]}),
      password: new FormControl( '', {validators: [ Validators.required ]})
    });
  }

  private determineRedirect() {
    this.activatedRoute.queryParams.subscribe(( params: { returnTo: string }) => {
      this.redirectTo = params.returnTo;
    });
  }

  private subscribeToLoading() {
    this.isLoading =  this.spinnerService.isLoading();
  }
}
