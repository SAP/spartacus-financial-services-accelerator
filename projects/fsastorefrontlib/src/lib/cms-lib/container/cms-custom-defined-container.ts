import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSCustomDefineStyleCMSComponentsContainer } from 'projects/fsastorefrontlib/src/lib/occ-models';

@Component({
  selector: 'fsa-cms-custom-defined-container',
  templateUrl: './cms-custom-defined-container.html'
})
export class CmsCustomDefinedContainer{
  
  routeParamId: string = "formCode";
  pageContext: PageContext;

  components$;

  constructor(
    protected componentData: CmsComponentData<CMSCustomDefineStyleCMSComponentsContainer>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
  ) { 
      activatedRoute.params.subscribe(params => {
        this.pageContext = new PageContext(params[this.routeParamId], PageType.CATEGORY_PAGE);
      })
    }
      
  ngOnInit()
  {
    this.componentData.data$.subscribe(data=> {
        this.components$ = this.cmsComponentConnector.getList(data.simpleCMSComponents.split(' '), this.pageContext)
    })
  }

}
