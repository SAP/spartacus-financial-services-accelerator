import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';
import { ActivatedRoute } from '@angular/router';
import { RoutingService, LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormDataService } from '../../core/services/data/form-data.service';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { YFormData } from '../../core/models/form-occ.models';

@Component({
  selector: 'cx-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent extends AbstractFormComponent
  implements OnInit, OnDestroy {
  constructor(
    protected formDataService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected formService: OccMockFormService,
    public formConfig: DynamicFormsConfig,
    protected languageService: LanguageService
  ) {
    super(formService, formConfig, languageService);
  }

  subscription = new Subscription();

  categoryCode: string;

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            this.categoryCode = params['formCode'];
          })
        )
        .subscribe()
    );
  }

  onSubmit() {
    const formDataId = this.formDataService.getFormDataIdByCategory(
      this.categoryCode
    );
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formDataService.submit(formData);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
