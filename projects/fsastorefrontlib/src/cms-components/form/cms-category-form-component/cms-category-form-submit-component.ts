import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSFormSubmitComponent } from '../../../occ/occ-models';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { FormSampleConfigurations } from './form-sample-configurations';
import { map, switchMap } from 'rxjs/operators';
import { FormDefinition } from '@fsa/dynamicforms';

@Component({
  selector: 'fsa-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit-component.html',
})
export class CmsCategoryFormSubmitComponent implements OnInit, OnDestroy {
  
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector
  ) {
  }

  routeParamId = 'formCode';
  pageContext: PageContext;
  formConfig: FormDefinition;
  component$: Observable<CMSFormSubmitComponent>;
  private subscription = new Subscription();

  ngOnInit() {
   this.activatedRoute.params.pipe(
     switchMap(routeParam => {
      this.pageContext = new PageContext(
        routeParam[this.routeParamId],
        PageType.CATEGORY_PAGE
      );
      return this.component$ = this.cmsComponentConnector.get(
        this.componentData.uid,
        this.pageContext
      );
     }), map(componentData => {
      if (componentData && componentData.formId) {
        this.formConfig = FormSampleConfigurations.sampleConfigurations.filter(
          item => item.formId === componentData.formId
        )[0];
      }
     })
     ).subscribe();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
