import { Component, Input, ViewChild, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { FormDefinition } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormDataService } from '../../services/data/form-data.service';
import { Subscription } from 'rxjs';

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
  formName: string;
  @Input()
  formConfig: FormDefinition;
  @Input()
  applicationId: string;

  submit(formData: { [name: string]: any }) {
    if (this.form.valid) {
      this.subscription.add(
        this.formDataService
          .saveFormData(this.formName, this.applicationId, formData)
          .subscribe(response => {
            this.formDataService.currentForm$.next({
              id: response.id,
              formDefinitionId: this.formName,
              content: response.content,
              categoryCode: this.formCategoryCode,
            });

            sessionStorage.setItem( this.formName, response.id );
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
