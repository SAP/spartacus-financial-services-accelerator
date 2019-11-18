import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDefinition, OccFormService } from '@fsa/dynamicforms';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { CMSFormSubmitComponent } from '../../../occ/occ-models';
import { FormSampleConfigurations } from './form-sample-configurations';

@Component({
  selector: 'fsa-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit-component.html',
})
export class CmsCategoryFormSubmitComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected yFormService: OccFormService
  ) {}

  routeParamId = 'formCode';
  pageContext: PageContext;
  formConfig: FormDefinition;
  component$: Observable<CMSFormSubmitComponent>;
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
          mergeMap(componentData => {
            if (componentData && componentData.formId) {
              this.formConfig = FormSampleConfigurations.sampleConfigurations.filter(
                item => item.formId === componentData.formId
              )[0];
            }
            if (!this.formConfig) {
              return this.yFormService.getFormDefinition(
                componentData.applicationId,
                componentData.formId
              );
            }
          })
        )
        .subscribe(formDefinition => {
          if (formDefinition && formDefinition.content) {
            this.formConfig = <FormDefinition>(
              JSON.parse(formDefinition.content)
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
