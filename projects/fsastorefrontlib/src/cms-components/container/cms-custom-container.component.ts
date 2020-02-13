import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  CmsComponent,
  CMSCustomComponentsContainer,
} from '../../occ/occ-models';

@Component({
  selector: 'fsa-cms-custom-container',
  templateUrl: './cms-custom-container.component.html',
})
export class CmsCustomContainerComponent implements OnInit {
  routeParamId = 'formCode';
  pageContext: PageContext;
  styleCss: string;
  components$: Observable<CmsComponent[]>;

  @HostBinding('class') get ContainerClass() {
    return this.styleCss;
  }

  constructor(
    protected componentData: CmsComponentData<CMSCustomComponentsContainer>,
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

  ngOnInit() {
    this.componentData.data$
      .subscribe(data => {
        this.styleCss = data.styleCss ? data.styleCss : '';
        this.components$ = this.cmsComponentConnector.getList(
          data.simpleCMSComponents.split(' '),
          this.pageContext
        );
      })
      .unsubscribe();
  }
}
