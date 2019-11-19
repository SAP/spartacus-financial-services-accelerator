import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, FormDefinition, YFormDefinition } from '@fsa/dynamicforms';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
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
    protected formDataService: FormDataService
  ) { }

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
              return this.formDataService.getFormDefinition(
                componentData.applicationId,
                componentData.formId
              );
            }
            return of(null);
          }),
          map(formDefinition => {
            if (formDefinition && formDefinition.content) {
              this.formConfig = <FormDefinition>(
                JSON.parse((<YFormDefinition>formDefinition).content)
              );
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
