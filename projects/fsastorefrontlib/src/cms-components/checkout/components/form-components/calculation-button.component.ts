import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractFormComponent, DynamicFormsConfig, FormDataService, FormDataStorageService, YFormData } from '@fsa/dynamicforms';
import { LanguageService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OccMockFormService } from './../../../../../../dynamicforms/src/occ/services/occ-mock-form.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { PricingData } from './../../../../occ/occ-models/form-pricing.interface';
import { FSProduct } from './../../../../occ/occ-models/occ.models';

@Component({
    selector: 'cx-fs-button',
    templateUrl: './calculation-button.component.html',
})
export class CalculationButtonComponent extends AbstractFormComponent {
    constructor(
        protected currentProductService: CurrentProductService,
        protected formDataStorageService: FormDataStorageService,
        protected formDataService: FormDataService,
        protected occcMockFormService: OccMockFormService,
        protected formConfig: DynamicFormsConfig,
        protected languageService: LanguageService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected pricingService: PricingService,
    ) {
        super(occcMockFormService, formConfig, languageService, changeDetectorRef);
    }

    subscription = new Subscription();
    pricingData: PricingData = {};

    categoryCode: string;

    ngOnInit() {
        super.ngOnInit();
        this.subscription.add(
            this.currentProductService
                .getProduct()
                .pipe(
                    filter(Boolean),
                    map(currentProduct => {
                        if (currentProduct) {
                            this.categoryCode = (<FSProduct>(
                                currentProduct
                            )).defaultCategory.code;
                        }
                    })
                )
                .subscribe()
        );
    }

    onSubmit() {
        const formDataId = this.formDataStorageService.getFormDataIdByCategory(
            this.categoryCode
        );
        const formData: YFormData = {};
        if (formDataId) {
            formData.id = formDataId;
        }
        this.formDataService.submit(formData);

        this.subscription.add(
            this.formDataService
                .getSubmittedForm()
                .pipe(
                    map(yFormData => {
                        if (yFormData && yFormData.content) {
                            const pricingData = this.pricingService.buildPricingData(
                                JSON.parse(yFormData.content)
                            );
                            this.pricingService.setPricingData(pricingData);
                        }
                    })
                )
                .subscribe()
        );
    }
}
