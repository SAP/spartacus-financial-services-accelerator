import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FSCartCouponComponent } from './cart-coupon.component';
import { CartCouponModule, FormErrorsModule } from '@spartacus/storefront';

@NgModule({
    declarations: [FSCartCouponComponent],
    exports: [FSCartCouponComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        CartCouponModule,
    ],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                CartCouponFlex: {
                    component: FSCartCouponComponent,
                },
            },
        }),
    ]
})
export class FSCartCouponModule {}
