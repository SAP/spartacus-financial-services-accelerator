import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideConfig,
  UrlModule,
} from '@spartacus/core';
import { SpinnerModule, FormErrorsModule } from '@spartacus/storefront';
import { FSUpdateProfileComponentService } from './update-profile-component.service';
import { FSUpdateProfileComponent } from './update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
    RouterModule,
    UrlModule,
  ],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: FSUpdateProfileComponent,
          guards: [AuthGuard],
        },
      },
    }),
    FSUpdateProfileComponentService,
  ],
  declarations: [FSUpdateProfileComponent],
  exports: [FSUpdateProfileComponent],
})
export class UpdateProfileModule {}
