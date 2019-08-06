import { Component } from '@angular/core';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSCustomDefineStyleCMSComponentsContainer } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { ComparisonTableService } from 'projects/fsastorefrontlib/src/lib/cms-lib/comparison-table/comparison-table.service';


@Component({
  selector: 'fsa-travel-form',
  templateUrl: './general-information-form-container.html'
})
export class GeneralInformationPageContainer{
  
  // - use route with `:formCode` param - for General Information Form Pages
  routeParamId: string = "formCode";

  generalFormCategory: string;
  component$;
  formComponents$;
  pageContext: PageContext;

  constructor(
    protected componentData: CmsComponentData<CMSCustomDefineStyleCMSComponentsContainer>,
    protected activatedRoute: ActivatedRoute,
    protected comparisonTableService: ComparisonTableService,
    protected cmsComponentConnector: CmsComponentConnector,
  ) { 
      activatedRoute.params.subscribe(params => {
        this.generalFormCategory = params[this.routeParamId];
      })
      this.pageContext = new PageContext(this.generalFormCategory, PageType.CATEGORY_PAGE);
  }

  ngOnInit()
  {
    this.component$ = this.componentData.data$;
    this.component$.subscribe(data => {
    if (data.simpleCMSComponents) {
        let simpleCmsComponents: string[] = data.simpleCMSComponents.split(' ');
        this.formComponents$ = simpleCmsComponents.map(formComponentId => {
          return this.cmsComponentConnector.get(formComponentId, this.pageContext);
        })
      }
    });
  }

}
