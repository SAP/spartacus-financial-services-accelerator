import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { CmsFormSubmitComponent } from '../../../occ/occ-models';
import { FormDataService, FormCMSComponent } from '@fsa/dynamicforms';

@Component({
  selector: 'cx-fs-cms-form-submit',
  templateUrl: './cms-form-submit.component.html',
})
export class CMSFormSubmitComponent extends FormCMSComponent
  implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected formDataService: FormDataService
  ) {
    super(componentData, formDataService);
  }

  routeParamId = 'formCode';
  pageContext: PageContext;

  ngOnInit() {
    this.subscription.add(
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
    this.loadForm();
  }
}
