import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioGrid } from 'angular-formio/grid';
import { FormManagerRoutes, FormManagerService, FormManagerConfig, FormManagerModule } from 'angular-formio/manager';
import { FormioManagerComponent } from './formioManager.component';

@NgModule({
  imports: [
    CommonModule,
    FormioGrid,
    FormManagerModule,
    RouterModule.forChild(FormManagerRoutes())
  ],
  declarations: [FormioManagerComponent],
  entryComponents: [
    FormioManagerComponent
  ],
  exports: [
    FormioManagerComponent
  ],
  providers: [
    FormManagerService,
    {provide: FormManagerConfig, useValue: {
      tag: 'common'
    }}
  ]
})
export class FormioManagerModule { }