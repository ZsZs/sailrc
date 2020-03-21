import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import * as fromAppReducer from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthFeatureFacade } from '@sailrc/shared/authentication/feature';


@Component({
  selector: 'sailrc-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor( private authService: AuthFeatureFacade ) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
