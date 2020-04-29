import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CMSFormSubmitComponent } from '../../../occ/occ-models';
import { YFormCMSComponent } from 'projects/dynamicforms/src/cms-components/yform-cms/yform-cms.component';

@Component({
  selector: 'cx-fs-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit.component.html',
})
export class CmsCategoryFormSubmitComponent extends YFormCMSComponent
  implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected formDataService: FormDataService
  ) {
    super(componentData, formDataService);
  }

  routeParamId = 'formCode';
  pageContext: PageContext;
  private sub = new Subscription();

  ngOnInit() {
    this.sub.add(
      this.activatedRoute.params
        .pipe(
          map(routeParam => {
            this.pageContext = new PageContext(
              routeParam[this.routeParamId],
              PageType.CATEGORY_PAGE
            );
            return (this.component$ = this.cmsComponentConnector.get(
              this.componentData.uid,
              this.pageContext
            ));
          })
        )
        .subscribe()
    );
    this.loadFormInformation();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
