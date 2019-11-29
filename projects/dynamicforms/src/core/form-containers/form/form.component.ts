import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { FormDefinition } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormDataService } from '../../services/data/form-data.service';
import { Subscription, Observable } from 'rxjs';
import { YFormData } from '@fsa/dynamicforms';

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
  formConfig: FormDefinition; // Should be changed to observable once configs are provided vie BE
  @Input()
  applicationId: string;
  @Input()
  formData: Observable<YFormData>;

  submit(formData: { [name: string]: any }) {
    if (this.form && this.form.valid) {
      this.subscription.add(
        this.formDataService
          .saveFormData(this.formId, this.applicationId, formData)
          .subscribe(response => {
            this.formDataService.currentForm$.next({
              id: response.id,
              formDefinitionId: this.formId,
              content: response.content,
              categoryCode: this.formCategoryCode,
            });
            this.formDataService.setFormDataToLocalStorage(
              this.formId,
              response.id
            );
            this.formDataService.setSubmittedForm(response);
          })
      );
    }
  }
  ngOnDestroy() {
    this.formDataService.setSubmittedForm(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
