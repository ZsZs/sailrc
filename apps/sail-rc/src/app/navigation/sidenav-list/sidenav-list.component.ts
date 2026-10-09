import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFeatureFacade } from '@processpuzzle/authentication/feature';

@Component({
  selector: 'sailrc-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor(private authService: AuthFeatureFacade) {}

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
