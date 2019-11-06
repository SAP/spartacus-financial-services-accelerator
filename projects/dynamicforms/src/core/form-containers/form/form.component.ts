import { Component, Input, ViewChild } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { PricingService } from '../../services/pricing/pricing.service';
import { FormDefinition } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { OccYformService } from 'projects/dynamicforms/src/occ/services/form/occ-yform.service';

@Component({
  selector: 'cx-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent {
  constructor(
    protected routingService: RoutingService,
    protected pricingService: PricingService,
    protected yformService: OccYformService
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
      this.pricingService.buildPricingData(formData);
      this.pricingService.getPricingAttributes().subscribe(content => {
        this.yformService
          .saveFormData(this.formId, 'insurance', '', content)
          .subscribe(response => {
            console.log(response);
          });
      });
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
