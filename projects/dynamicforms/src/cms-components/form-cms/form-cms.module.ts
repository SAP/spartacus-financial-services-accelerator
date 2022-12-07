import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCMSComponent } from './form-cms.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { FormContainerModule } from '../../core/form-containers/form-container.module';

@NgModule({
    declarations: [FormCMSComponent],
    imports: [
        CommonModule,
        SpinnerModule,
        FormContainerModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                YFormCMSComponent: {
                    component: FormCMSComponent,
                },
            },
        }),
    ],
    exports: [FormCMSComponent]
})
export class FormCMSModule {}
