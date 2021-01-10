import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseEntityInterface, IEntityFormState } from '@sailrc/shared/base';

export abstract class BaseResolver<T> implements Resolve<T> {

  constructor( protected parameterName: string, protected store: Store<IEntityFormState<BaseEntityInterface>> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<T> {
    const idParameter = this.resolveParameter( route, this.parameterName );
    let entity: Observable<T>;
    if ( idParameter === 'new' ) {
      entity = this.resolveNewEntity( route );
    } else {
      entity = this.resolveEntity( idParameter, route );
    }

    return entity;
  }

  // protected, private helper methods
  protected abstract resolveNewEntity( route: ActivatedRouteSnapshot ): Observable<T>;
  protected abstract resolveEntity( entityId: string, route: ActivatedRouteSnapshot ): Observable<T>;

  protected resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
