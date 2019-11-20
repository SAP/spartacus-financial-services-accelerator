import { YFormData } from './../../models/form-occ.models';
import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { FormDefinition } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormDataService } from '../../services/data/form-data.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'cx-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnDestroy {
  private subscription = new Subscription();

  constructor(
    protected routingService: RoutingService,
    protected formDataService: FormDataService
  ) {}

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;
  @Input()
  formId: string;
  @Input()
  formConfig: FormDefinition;
  @Input()
  applicationId: string;
  savedFormData: Observable<YFormData>;

  submit(formData: { [name: string]: any }) {
    if (this.form.valid) {
        this.savedFormData = this.formDataService.saveFormData(this.formId, this.applicationId, formData);
        this.savedFormData.subscribe(response => {
            this.formDataService.currentForm$.next({
              id: response.id,
              formDefinitionId: this.formId,
              content: response.content,
              categoryCode: this.formCategoryCode,
            });
            if (this.formCategoryCode) {
              this.navigateNext();
            }
          });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Should be removed from dynamic forms module!!!
  // Should be more configurable to support other routes/pages
  navigateNext() {
    this.routingService.go({
      cxRoute: 'category',
      params: { code: this.formCategoryCode },
    });
  }
}
