import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { EditEntity } from '../auto-entity-form/actions';
import { IBaseEntityFacade } from '../auto-entity/i-base-entity.facade';
import { filter, first, tap } from 'rxjs/operators';
import { makeEntity } from '@briebug/ngrx-auto-entity';

export abstract class BaseResolver<T extends BaseEntityInterface> implements Resolve<T> {
  protected parameterName: string;

  protected constructor( protected entityFacade: IBaseEntityFacade<T>, protected store: Store<any> ) {
    this.parameterName = this.entityFacade.entityIdPathVariable;
  }

  resolve( route: ActivatedRouteSnapshot ): Observable<T> {
    const idParameter = this.resolveParameter( route, this.parameterName );
    let entity: Observable<T>;
    if ( idParameter === 'new' ) {
      entity = this.resolveNewEntity( route );
    } else {
      entity = this.resolveEntity( idParameter, route );
    }

    return entity;
  }

  // region protected, private helper methods
  protected adjustEntity( entity: T, route: ActivatedRouteSnapshot ) {
    return entity;
  }

  private resolveNewEntity( route: ActivatedRouteSnapshot ): Observable<T> {
    const initialEntityState = this.entityFacade.initialEntityState;
    let entity = makeEntity<T>( this.entityFacade.entityInfo.modelType )( initialEntityState ) as T;
    entity = this.adjustEntity( entity, route );
    this.store.dispatch( new EditEntity<T>( this.entityFacade.entityInfo.modelType, entity ));
    return from( [entity]);
  }

  private resolveEntity( entityId: string, route: ActivatedRouteSnapshot ): Observable<T> {
    return this.store.pipe(
      select( this.entityFacade.getEntityById( entityId )),
      tap( entity => {
        if( !entity ) this.loadEntity( entityId, route );
      }),
      filter( entity => !! entity ),
      first(),
      tap( entity => this.entityFacade.select( entity )),
      tap( entity => this.store.dispatch( new EditEntity( this.entityFacade.entityInfo.modelType, entity )))
    );
  }

  protected loadEntity( entityId: string, route: ActivatedRouteSnapshot ){
    this.entityFacade.load({ id: entityId })
  }

  protected resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
  // endregion
}
