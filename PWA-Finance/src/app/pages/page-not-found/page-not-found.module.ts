import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
