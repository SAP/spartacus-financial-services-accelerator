import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, ConfigModule, I18nModule, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { SelectIdentificationComponent } from './select-identification/select-identification.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        I18nModule,
        RouterModule,
        NgSelectModule,
        SpinnerModule,
        MediaModule,
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
