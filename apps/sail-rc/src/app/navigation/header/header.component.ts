import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFeatureFacade } from '@sailrc/shared/authentication/feature';

@Component({
  selector: 'sailrc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor( private authFeatureFacade: AuthFeatureFacade ) { }

  ngOnInit() {
    this.isAuth = this.authFeatureFacade.isAuthenticated();
  }

  onLogout() {
    this.authFeatureFacade.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
