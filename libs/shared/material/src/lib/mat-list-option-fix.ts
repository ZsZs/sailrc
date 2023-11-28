
import { Directive, Host, OnDestroy } from '@angular/core';
import { MatListOption } from '@angular/material/list';

/**
 * This directive fixes an issue with the selection findAll component
 * which causes the form state to lose all values when the selection
 * findAll component leaves the DOM. The reason for that is that the
 * findAll options de-addRegistration themselves when being destroyed which
 * forces the findAll to update its value (which then does not contain
 * the removed option anymore). This behaviour usually makes sense
 * but as a side-effect it also resets the value of the findAll when the
 * findAll itself is destroyed since all its child options are destroyed
 * first. This directive is a workaround for that by preventing the
 * option from reporting the value change after it is destroyed. This
 * only works because reporting the value change is deferred inside
 * the ngOnDestroy function of the MatListOption which allows us to
 * run the code below in between the option being destroyed and it
 * trying to report the value change to its parent findAll (this has been
 * observed up until v5.2.5 of @angular/material, therefore there is
 * no guarantee that this workaround will continue to work).
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-list-option',
})
export class MatListOptionFixDirective {
  constructor(@Host() private matDirective: MatListOption) { }

  // TODO: verify if theis workaround is still needed
  // ngOnDestroy() {
  // this.matDirective.selectionList = { _reportValueChange: () => void 0 } as any;
  //}
}
