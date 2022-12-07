import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule, DynamicFormsConfig } from '@spartacus/dynamicforms';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { CalculationButtonComponent } from './form-components/calculation-button.component';
import { CartPrefillResolver } from './resolver/cart-prefill-resolver';
import { AutoPersonalDetailsPrefillResolver } from './resolver/auto-personal-details-prefill-resolver';
import { CartEntriesPrefillResolver } from './resolver/cart-entries-prefill-resolver';
import { DynamicSelectComponent } from './form-components/dynamic-select/dynamic-select.component';
import { ClaimPrefillResolver } from './resolver/claim-prefill-resolver';
import { FSUserPrefillResolver } from './resolver/user-prefill-resolver';
import { FSUserAddressPrefillResolver } from './resolver/user-address-prefill-resolver';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        I18nModule,
        DynamicFormModule,
        ConfigModule.withConfig(<DynamicFormsConfig>{
            dynamicForms: {
                components: {
                    calculateButton: {
                        component: CalculationButtonComponent,
                    },
                    dynamicSelect: {
                        component: DynamicSelectComponent,
                    },
                },
                prefill: {
                    cart: {
                        prefillResolver: CartPrefillResolver,
                    },
                    autoPersonalDetails: {
                        prefillResolver: AutoPersonalDetailsPrefillResolver,
                    },
                    cartEntries: {
                        prefillResolver: CartEntriesPrefillResolver,
                    },
                    claim: {
                        prefillResolver: ClaimPrefillResolver,
                    },
                    user: {
                        prefillResolver: FSUserPrefillResolver,
                    },
                    address: {
                        prefillResolver: FSUserAddressPrefillResolver,
                    },
                },
            },
        }),
    ],
    declarations: [CalculationButtonComponent, DynamicSelectComponent],
    exports: [CalculationButtonComponent, DynamicSelectComponent]
})
export class FSDynamicformsModule {}
