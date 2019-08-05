import { NgModule } from "@angular/core";
import { ConfigModule, CmsConfig, AuthGuard, Config, UrlModule, I18nModule } from "@spartacus/core";
import { CartNotEmptyGuard, CheckoutConfig } from "@spartacus/storefront";
import { FSCheckoutProgressComponent } from "./fs-checkout-progress.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                CheckoutProgress: {
                    component: FSCheckoutProgressComponent,
                    guards: [ CartNotEmptyGuard ]
                }
            }
        })
    ],
    declarations: [FSCheckoutProgressComponent],
    entryComponents: [FSCheckoutProgressComponent],
    exports: [FSCheckoutProgressComponent],
    providers: [{provide: CheckoutConfig, useExisting: Config}]
})
export class FSCheckoutProgressModule {}