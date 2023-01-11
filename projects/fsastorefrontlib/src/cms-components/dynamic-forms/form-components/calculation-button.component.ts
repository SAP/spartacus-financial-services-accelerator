import { Component, Injector, OnInit } from '@angular/core';
import {
  AbstractFormComponent,
  DynamicFormsConfig,
  FormDataService,
  FormDataStorageService,
  FormService,
  YFormData,
} from '@spartacus/dynamicforms';
import { LanguageService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FSProduct } from '../../../occ/occ-models/occ.models';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Component({
  selector: 'cx-fs-button',
  templateUrl: './calculation-button.component.html',
})
export class CalculationButtonComponent
  extends AbstractFormComponent
  implements OnInit
{
  constructor(
    protected currentProductService: CurrentProductService,
    protected formDataStorageService: FormDataStorageService,
    protected formDataService: FormDataService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected formService: FormService,
    protected injector: Injector
  ) {
    super(formConfig, languageService, injector, formService);
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
            const product = <FSProduct>currentProduct;
            if (product && product.defaultCategory) {
              this.categoryCode = product.defaultCategory.code;
            }
          })
        )
        .subscribe()
    );
  }

  onSubmit(event: UIEvent) {
    const formDataId = this.formDataStorageService.getFormDataIdByCategory(
      this.categoryCode
    );
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formDataService.setContinueToNextStep(false);
    this.formDataService.submit(formData);
    event.stopPropagation();
  }
}
