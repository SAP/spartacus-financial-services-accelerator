import { Component } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSFormSubmitComponent } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';

@Component({
  selector: 'cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit-component.html'
})
export class CmsCategoryFormSubmitComponent{

  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector
  ) { 
    activatedRoute.params.subscribe(params => {
      this.pageContext = new PageContext(params[this.routeParamId], PageType.CATEGORY_PAGE);      
    })
  }

  routeParamId: string = "formCode";
  pageContext: PageContext;

  component$: any

  ngOnInit()
  {
    this.component$ = this.cmsComponentConnector.get(this.componentData.uid, this.pageContext);
  }

}
