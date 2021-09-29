import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule, FormErrorsModule } from '@spartacus/storefront';
import { FSUpdateProfileFormComponent } from './update-profile-form/update-profile-form.component';
import { FSUpdateProfileComponent } from './update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileSPAComponent: {
          component: FSUpdateProfileComponent,
          guards: [AuthGuard],
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
  ],
  declarations: [FSUpdateProfileComponent, FSUpdateProfileFormComponent],
  exports: [FSUpdateProfileComponent, FSUpdateProfileFormComponent],
  entryComponents: [FSUpdateProfileComponent],
})
export class UpdateProfileModule {}
