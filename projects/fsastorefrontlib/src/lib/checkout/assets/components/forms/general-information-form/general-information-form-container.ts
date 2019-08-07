import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSCustomDefineStyleCMSComponentsContainer } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { Observable } from 'rxjs';
import { switchMap, combineLatest, map } from 'rxjs/operators';

@Component({
  selector: 'fsa-general-information-form',
  templateUrl: './general-information-form-container.html'
})
export class GeneralInformationPageContainer{
  
  // - use route with `:formCode` param - for General Information Form Pages
  routeParamId: string = "formCode";

  generalFormCategory: string;
  generalInformationPageContainerComponent$;
  formComponents$;
  pageContext: PageContext;

  // components$: Observable<any[]> = this.componentData.data$.pipe(
  //   switchMap(data =>
  //         this.cmsComponentConnector.getList(data.simpleCMSComponents.split(' '), this.pageContext).pipe(
  //           map(formComponent => {
  //             return {
  //               ...formComponent
  //             };
  //           })
  //         )
  //   )
  // );

  components$: Observable<any[]> = this.componentData.data$.pipe(
    switchMap(data =>
      combineLatest(
        data.simpleCMSComponents.split(' ').map(component =>
          this.cmsComponentConnector.getList(data.simpleCMSComponents.split(' '), this.pageContext).pipe(
            map(form => {
              return {
                ...form,
              };
            })
          )
        )
      )
    )
  );

  
  constructor(
    protected componentData: CmsComponentData<CMSCustomDefineStyleCMSComponentsContainer>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
  ) { 
      activatedRoute.params.subscribe(params => {
        this.generalFormCategory = params[this.routeParamId];
      })
      this.pageContext = new PageContext(this.generalFormCategory, PageType.CATEGORY_PAGE);
  }

  ngOnInit()
  {
    this.generalInformationPageContainerComponent$ = this.componentData.data$;
  }

}
