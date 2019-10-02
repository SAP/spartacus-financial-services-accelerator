import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { PricingService } from '../../services/pricing/pricing.service';
import { FormSampleConfigurations } from './configurations/form-sample-configurations';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import {
  FormDefinition,
  FormSubmitType,
} from './dynamic-form/models/field-config.interface';
import { OccYFormService } from 'projects/fsastorefrontlib/src/lib/occ/yform/yform.service';
import { Observable, of, BehaviorSubject, config, ReplaySubject } from 'rxjs';
import { ValidatorFn, Validators } from '@angular/forms';
import { CustomFormValidators } from '../../../../cms-lib/util/validators/custom-form-validators';


@Component({
  selector: 'fsa-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected pricingService: PricingService,
    protected yFormService: OccYFormService
  ) {}

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;

  config$ = new ReplaySubject<any>(1);

  ngOnInit() {
    this.yFormService.getFormDefinition('test_form').subscribe(form => {
        this.config$.next((JSON.parse(form.content, this.dataReviver)));
      });
  }

  dataReviver(key, value) {
      if (key === 'validation') {
        const validations: ValidatorFn[] = [];
        const functionNames = value.split(';');
        functionNames.forEach(functionName => {
          switch (functionName) {
            case ('Validators.required') : validations.push(Validators.required);
            case ('CustomFormValidators.compareToCurrentDate(shouldBeGreater)') :
                validations.push(CustomFormValidators.compareToCurrentDate('shouldBeGreater'));
          }
        });
        return validations;
      }
      return value;
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
