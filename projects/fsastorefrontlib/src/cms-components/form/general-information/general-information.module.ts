import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { DynamicFormModule } from '@spartacus/dynamicforms';
import { SpinnerModule } from '@spartacus/storefront';
import { GeneralInformationComponent } from './general-information.component';

@NgModule({
    imports: [
        CommonModule,
        DynamicFormModule,
        SpinnerModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                GeneralInformationFlex: {
                    component: GeneralInformationComponent,
                },
            },
        }),
    ],
    declarations: [GeneralInformationComponent],
    exports: [GeneralInformationComponent]
})
export class GeneralInformationModule {}
