import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsComponent,
  CmsComponentConnector,
  PageContext,
  PageType,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CMSCustomComponentsContainer } from '../../occ/occ-models';

@Component({
  selector: 'cx-fs-cms-custom-container',
  templateUrl: './cms-custom-container.component.html',
})
export class CmsCustomContainerComponent implements OnInit, OnDestroy {
  routeParamId = 'formCode';
  pageContext: PageContext;
  styleCss: string;
  components$: Observable<CmsComponent[]>;

  @HostBinding('class') get ContainerClass() {
    return this.styleCss;
  }

  private subscription = new Subscription();

  constructor(
    protected componentData: CmsComponentData<CMSCustomComponentsContainer>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector
  ) {
    this.subscription.add(
      activatedRoute.params
        .pipe(
          map(params => {
            this.pageContext = new PageContext(
              params[this.routeParamId],
              PageType.CATEGORY_PAGE
            );
          })
        )
        .subscribe()
    );
  }

  ngOnInit() {
    this.subscription.add(
      this.componentData.data$
        .pipe(
          map(data => {
            this.styleCss = data.styleClasses ? data.styleClasses : '';
            this.components$ = this.cmsComponentConnector.getList(
              data.simpleCMSComponents.split(' '),
              this.pageContext
            );
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
