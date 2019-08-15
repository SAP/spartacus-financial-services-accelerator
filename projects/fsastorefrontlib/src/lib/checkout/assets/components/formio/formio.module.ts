import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioBuilderComponent } from './builder/formioBuilder.component';
import { FormioModule } from 'angular-formio';
import { FormioRendererComponent } from './renderer/formioRenderer.component';


@NgModule({
  imports: [
    CommonModule,
    FormioModule
  ],
  declarations: [FormioBuilderComponent, FormioRendererComponent],
  exports: [FormioBuilderComponent, FormioRendererComponent],
  providers: []

})
export class FSFormsioModule {
}
