import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { FormDefinition } from '../../models/form-config.interface';
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

  submit(formData: YFormData) {
    if (this.form && this.form.valid) {
      console.log('in');
      this.subscription.add(
        this.formDataService
          .saveFormData({
            formDefinition: {
              formId: this.formId,
              applicationId: this.applicationId,
            },
            content: formData.content,
            refId: formData.refId,
            id: formData.id,
          })
          .subscribe(response => {
            const savedForm = {
              id: response.id,
              formDefinition: {
                formId: response.formDefinition.formId,
              },
              content: response.content,
              categoryCode: this.formCategoryCode,
            };
            this.formDataService.currentForm$.next(savedForm);
            this.formDataService.setFormDataToLocalStorage(savedForm);
            this.formDataService.setSubmittedForm(response);
          })
      );
    }
  }
  ngOnDestroy() {
    this.formDataService.setSubmittedForm({});
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
