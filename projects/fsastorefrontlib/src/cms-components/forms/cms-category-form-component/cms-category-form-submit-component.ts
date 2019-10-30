import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSFormSubmitComponent, CmsComponent } from '../../../lib/occ-models';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit-component.html',
})
export class CmsCategoryFormSubmitComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector
  ) {
    activatedRoute.params.subscribe(params => {
      this.pageContext = new PageContext(
        params[this.routeParamId],
        PageType.CATEGORY_PAGE
      );
    });
  }

  routeParamId = 'formCode';
  pageContext: PageContext;

  component$: Observable<CmsComponent>;

  ngOnInit() {
    this.component$ = this.cmsComponentConnector.get(
      this.componentData.uid,
      this.pageContext
    );
  }
}
