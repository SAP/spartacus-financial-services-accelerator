import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from '@spartacus/core';
import { FormComponent } from './form.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    DynamicFormModule,
    NgbTooltipModule
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
  providers: []

})
export class FSFormsModule {
}
