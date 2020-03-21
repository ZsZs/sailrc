import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { RouterFacade } from '@sailrc/shared/util';

@Component({
  selector: 'sailrc-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css']
})
export class BoatClassDetailsComponent implements OnInit {
  formState$: Observable<FormGroupState<BoatClass>>;
  submittedValue$: Observable<BoatClass | undefined>;
  isLoading: Observable<boolean>;

  constructor( private boatClassFacade: BoatClassFacade, private routerFacade: RouterFacade ) {
    this.selectFormState();
    this.submittedValue$ = boatClass$;
  }

  // event handling methods
  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.boatClassFacade.deselectAll();
    this.routerFacade.routerGo(  ['/boat-class'] )
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.boatClassFacade.deselectAll() )),
      map( formState => formState.value ),
      map(boatClass => addOrUpdateBoatClass( { boatClass, redirectTo: { path: ['/boat-class'] } }))
    ).subscribe( this.store );
  }

  // public accessors and mutators

  // protected, private helper methods
  private selectFormState() {
    this.formState$ = this.store.pipe( select(state => state.boatClassManagement.boatClassDetailsForm ));
  }

  private subscribeToLoading() {
    this.isLoading = this.boatClassFacade.isLoading$;
  }
}
