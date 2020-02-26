import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentConnector, PageContext, PageType, CmsComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CMSCustomComponentsContainer } from '../../occ/occ-models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-cms-custom-container',
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
