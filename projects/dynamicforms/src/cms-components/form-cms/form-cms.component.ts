import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDefinition } from '../../core/models/form-config.interface';
import { YFormData, YFormDefinition } from '../../core/models/form-occ.models';
import { FormDataService } from '../../core/services/data/form-data.service';
import { YFormCmsComponent } from '../cms-component.models';
import { FormDataStorageService } from './../../core/services/storage/form-data-storage.service';

@Component({
  selector: 'cx-form-cms',
  templateUrl: './form-cms.component.html',
})
export class FormCMSComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService
  ) {}

  component$: Observable<YFormCmsComponent>;
  formDefinition$: Observable<YFormDefinition>;
  formData$: Observable<YFormData>;
  formConfig: FormDefinition;

  subscription = new Subscription();

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.loadForm();
  }

  loadForm() {
    this.formDefinition$ = this.formDataService.getFormDefinition().pipe(
      map(definition => {
        if (definition.content) {
          this.formConfig = <FormDefinition>JSON.parse(definition.content);
        }
        return definition;
      })
    );

    this.subscription.add(
      this.component$
        .pipe(
          map(component => {
            this.formDataService.loadFormDefinition(
              component.applicationId,
              component.formId
            );
            const formDataId = this.formDataStorageService.getFormDataIdByDefinitionCode(
              component.formId
            );
            if (formDataId) {
              this.formDataService.loadFormData(formDataId);
              this.formData$ = this.formDataService.getFormData();
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
