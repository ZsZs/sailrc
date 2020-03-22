import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatClassComponent } from './boat-class.component';
import { BoatClassDetailsComponent } from './details/boat-class-details.component';
import { BoatClassListComponent } from './list/boat-class-list.component';
import { BoatClassTabsComponent } from './tabs/boat-class-tabs.component';
import { BoatDomainModule } from '@sailrc/boat/domain';
import { BoatFeatureRoutingModule } from './boat-feature-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    BoatClassComponent,
    BoatClassDetailsComponent,
    BoatClassListComponent,
    BoatClassTabsComponent
  ],
  imports: [
    BoatDomainModule,
    BoatFeatureRoutingModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
  ]
})
export class BoatFeatureModule {}
