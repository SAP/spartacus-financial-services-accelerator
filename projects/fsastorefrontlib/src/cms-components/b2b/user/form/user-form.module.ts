import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormModule } from '@spartacus/organization/administration/components';
import { FormErrorsModule } from '@spartacus/storefront';
import { FSUserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [FSUserFormComponent],
  exports: [FSUserFormComponent],
})
export class FSUserFormModule {}
