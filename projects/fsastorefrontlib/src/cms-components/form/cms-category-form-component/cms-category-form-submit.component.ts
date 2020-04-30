import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormDataService,
  FormDefinition,
  YFormData,
  YFormDefinition,
} from '@fsa/dynamicforms';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CMSFormSubmitComponent } from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit.component.html',
})
export class CmsCategoryFormSubmitComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected formDataService: FormDataService
  ) {}

  routeParamId = 'formCode';
  pageContext: PageContext;
  formConfig: FormDefinition;
  formDefintion$: Observable<YFormDefinition> = of({});
  component$: Observable<CMSFormSubmitComponent>;
  formData$: Observable<YFormData>;
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          switchMap(routeParam => {
            this.pageContext = new PageContext(
              routeParam[this.routeParamId],
              PageType.CATEGORY_PAGE
            );
            return (this.component$ = this.cmsComponentConnector.get(
              this.componentData.uid,
              this.pageContext
            ));
          }),
          filter(
            componentData => componentData && componentData.formId !== undefined
          ),
          map(componentData => {
            this.formDataService.loadFormDefinition(
              componentData.applicationId,
              componentData.formId
            );
            this.formDefintion$ = this.formDataService.getFormDefinition().pipe(
              map(formDefinition => {
                // TO-DO Refactor when form-sample-configurations.ts is removed
                if (formDefinition.content) {
                  this.formConfig = <FormDefinition>(
                    JSON.parse(formDefinition.content)
                  );
                } else {
                  this.formConfig = <FormDefinition>formDefinition;
                }
                return this.formConfig;
              })
            );
          })
        )
        .subscribe()
    );
    this.subscription.add(
      this.component$
        .pipe(
          map(componentData => {
            const formDataId = this.formDataService.getFormDataIdFromLocalStorage(
              componentData.formId
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
