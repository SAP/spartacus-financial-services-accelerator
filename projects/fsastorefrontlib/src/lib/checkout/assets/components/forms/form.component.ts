import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { PricingService } from '../../services/pricing/pricing.service';
import { FormSampleConfigurations } from './configurations/form-sample-configurations';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import {
  FormDefinition,
  FormSubmitType,
} from './dynamic-form/models/field-config.interface';

@Component({
  selector: 'fsa-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected pricingService: PricingService
  ) {}

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;
  categoryConfig: FormDefinition;

  ngOnInit() {
    this.categoryConfig = FormSampleConfigurations.sampleConfigurations.filter(
      item => item.categoryCode === this.formCategoryCode
    )[0];
  }

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
      params: { code: this.form.config.categoryCode },
    });
  }
}
