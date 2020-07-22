import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { YFormData } from './../../models/form-occ.models';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { FormDefinition } from '../../models/form-config.interface';
import { FormDataService } from '../../services/data/form-data.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormDataStorageService } from './../../services/storage/form-data-storage.service';

@Component({
  selector: 'cx-form-component',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnDestroy {
  private subscription = new Subscription();
  constructor(
    protected routingService: RoutingService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService
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
  @Input()
  formData: Observable<YFormData>;

  submit(formData: YFormData) {
    if (this.form && this.form.valid && formData.content) {
      this.formDataService.saveFormData({
        formDefinition: {
          formId: this.formId,
          applicationId: this.applicationId,
        },
        content: formData.content,
        refId: formData.refId,
        id: this.formDataStorageService.getFormDataIdByDefinitionCode(
          this.formId
        ),
      });

      this.subscription.add(
        this.formDataService.getFormData().subscribe(response => {
          const savedForm = {
            id: response.id,
            formDefinition: {
              formId: response.formDefinition.formId,
            },
            content: response.content,
            categoryCode: this.formCategoryCode,
          };
          this.formDataStorageService.setFormDataToLocalStorage(savedForm);
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
