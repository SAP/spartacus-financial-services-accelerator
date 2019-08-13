import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioBuilderComponent } from './builder/formioBuilder.component';
import { FormioModule } from 'angular-formio';
import { FormioGrid } from 'angular-formio/grid';
import { FormManagerRoutes, FormManagerService, FormManagerConfig } from 'angular-formio/manager';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    FormioGrid,
    RouterModule.forChild(FormManagerRoutes()),
  ],
  declarations: [FormioBuilderComponent],
  exports: [FormioBuilderComponent],
  providers: [
    FormManagerService,
    {provide: FormManagerConfig, useValue: {
      tag: 'common',
      saveDraft: true,
      includeSearch: true
    }}
  ]

})
export class FSFormsioModule {
}
