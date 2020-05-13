import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDetailsComponent } from './personal-details.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { DynamicFormModule } from '@fsa/dynamicforms';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        PersonalDetailsFlex: {
          component: PersonalDetailsComponent,
        },
      },
    }),
  ],
  declarations: [PersonalDetailsComponent],
  exports: [PersonalDetailsComponent],
  entryComponents: [PersonalDetailsComponent],
})
export class PersonalDetailsModule {}
