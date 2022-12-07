import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { DynamicFormModule } from '@spartacus/dynamicforms';
import { PersonalDetailsComponent } from './personal-details.component';

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
    exports: [PersonalDetailsComponent]
})
export class PersonalDetailsModule {}
