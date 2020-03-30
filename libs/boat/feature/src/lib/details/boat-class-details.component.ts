import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { RouterFacade } from '@sailrc/shared/util';
import { BoatFeatureState } from '../store/boat-feature.reducer';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { BaseFormComponent } from '@sailrc/shared/base';

@Component({
  selector: 'sailrc-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css']
})
export class BoatClassDetailsComponent extends BaseFormComponent<BoatClass> implements OnDestroy {
  formState$: Observable<FormGroupState<BoatClass>>;
  submittedValue$: Observable<BoatClass | undefined>;
  submitSubscription: Subscription;
  isLoading: Observable<boolean>;

  constructor(
    protected boatClassFacade: BoatClassFacade,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    private routerFacade: RouterFacade, private store: Store<BoatFeatureState> ) {
    super( boatClassFacade, activeTabService, componentDestroyService, 'boat-class-details' )
    this.submittedValue$ = boatClassFacade.current$;
  }

  // event handling methods
  onCancel() {
    this.boatClassFacade.deselectAll();
    this.routerFacade.routerGo(  ['/boat-class'] )
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.submitSubscription.unsubscribe();
  }

  onSubmit() {
    this.submitSubscription = this.formState$.pipe(
      take(1),
      tap( () => this.boatClassFacade.deselectAll() ),
      map( formState => formState.value ),
      map(boatClass => this.boatClassFacade.replace( boatClass )),
      tap( () => this.routerFacade.routerGo( ['/boat-class'] ))
    ).subscribe();
  }

  // public accessors and mutators

  // protected, private helper methods
  protected selectFormState() {
    this.formState$ = this.store.pipe( select(state => state.boatClassDetailsForm ));
  }
}
