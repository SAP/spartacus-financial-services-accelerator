import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, I18nModule, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { SelectIdentificationComponent } from './select-identification/select-identification.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        RouterModule,
        ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
            cmsComponents: {
                UserIdentificationFlex: {
                    component: SelectIdentificationComponent
                }
            }
        })
    ],
    declarations: [SelectIdentificationComponent],
    exports: [SelectIdentificationComponent],
    entryComponents: [SelectIdentificationComponent]
})
export class UserIdentificationModule {
}
