import { Component, Input, ViewChild } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { PricingService } from '../core/services/pricing/pricing.service';
import { FormDefinition, FormSubmitType } from '../core/models/field-config.interface';
import { DynamicFormComponent } from '../core/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'cx-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent {
  constructor(
    protected routingService: RoutingService,
    protected pricingService: PricingService
  ) {}

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;
  @Input()
  formId: string;
  @Input()
  formConfig: FormDefinition;

  submit(formData: { [name: string]: any }) {
    if (this.form.valid) {
      switch (this.form.config.submitType) {
        case FormSubmitType.PRICING: {
          this.pricingService.buildPricingData(formData);
        }
      }
      this.navigateNext();
    }
  }

  // Should be more configurable to support other routes/pages
  navigateNext() {
    this.routingService.go({
      cxRoute: 'category',
      params: { code: this.formCategoryCode },
    });
  }
}
