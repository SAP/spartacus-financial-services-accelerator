import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { YFormData } from '@fsa/dynamicforms';
import { CurrencyService, RoutingService } from '@spartacus/core';
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
export class FormComponent implements OnDestroy, OnInit {
  private subscription = new Subscription();
  constructor(
    protected routingService: RoutingService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService,
    protected currencyService: CurrencyService
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
  currencyIso: string;

  ngOnInit(): void {
    this.currencyService.getActive().subscribe(curr => this.currencyIso = curr);
  }

  submit(formData: YFormData) {
    if (this.form && this.form.valid) {
      this.formDataService.saveFormData({
        currency: this.currencyIso,
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
