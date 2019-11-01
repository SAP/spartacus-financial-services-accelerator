import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { FSUpdateProfileFormComponent } from './update-profile-form/fs-update-profile-form.component';
import { FSUpdateProfileComponent } from './fs-update-profile.component';

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
  ],
  declarations: [FSUpdateProfileComponent, FSUpdateProfileFormComponent],
  exports: [FSUpdateProfileComponent],
  entryComponents: [FSUpdateProfileComponent],
})
export class FSUpdateProfileModule {}
