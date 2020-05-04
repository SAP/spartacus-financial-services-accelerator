import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { YFormCmsComponent } from '../cms-component.models';
import { FormDataService } from '../../core/services/data/form-data.service';
import { CmsComponentData } from '@spartacus/storefront';
import { YFormDefinition, YFormData } from '../../core/models/form-occ.models';
import { map } from 'rxjs/operators';
import { FormDefinition } from '../../core/models/form-config.interface';

@Component({
  selector: 'cx-form-cms',
  templateUrl: './form-cms.component.html',
})
export class FormCMSComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected formDataService: FormDataService
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
            const formDataId = this.formDataService.getFormDataIdFromLocalStorage(
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
