import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { YFormCmsComponent } from '../cms-component.models';
import { FormDataService } from './../../core/services/data/form-data.service';
import { CmsComponentData } from '@spartacus/storefront';
import { YFormDefinition, YFormData } from '../../core/models/form-occ.models';
import { map } from 'rxjs/operators';
import { FormDefinition } from './../../core/models/form-config.interface';

@Component({
  selector: 'cx-yform-cms',
  templateUrl: './yform-cms.component.html',
})
export class YFormCMSComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<YFormCmsComponent>,
    protected formDataService: FormDataService
  ) {}

  @Input()
  categoryCode;

  component$: Observable<YFormCmsComponent>;
  formDefinition$: Observable<
    YFormDefinition
  > = this.formDataService.getFormDefinition();
  formData$: Observable<YFormData>;

  private subscription = new Subscription();

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.loadFormInformation();
  }

  loadFormInformation() {
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
              this.formData$ = this.formDataService.getFormData(formDataId);
            }
          })
        )
        .subscribe()
    );
  }

  getFormConfig(formDefinition) {
    if (formDefinition.content) {
      return <FormDefinition>JSON.parse(formDefinition.content);
    }
  }
}
