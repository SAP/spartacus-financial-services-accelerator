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
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { FSUpdateProfileComponentService } from './update-profile-component.service';
import { FSUpdateProfileComponent } from './update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileSPAComponent: {
          component: FSUpdateProfileComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: UpdateProfileComponentService,
              useClass: FSUpdateProfileComponentService,
            },
          ],
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
  ],
  declarations: [FSUpdateProfileComponent],
  exports: [FSUpdateProfileComponent],
  entryComponents: [FSUpdateProfileComponent],
})
export class UpdateProfileModule {}
