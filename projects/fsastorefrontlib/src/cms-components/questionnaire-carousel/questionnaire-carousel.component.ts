import { Component, OnInit } from '@angular/core';
import {
  Breadcrumb,
  ProductSearchService,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import {
  CmsComponentData,
  FacetService,
  ICON_TYPE,
} from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE } from '../b2b/unit/units.config';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FSQuestionnaireCarouselComponent } from '../../occ/occ-models/cms-component.models';
import { ActivatedRoute } from '@angular/router';
import { FSProduct } from '../../occ';
import { FSCheckoutService } from '../../core/checkout/facade/checkout.service';

@Component({
  selector: 'cx-fs-questionnaire-carosel',
  templateUrl: './questionnaire-carousel.component.html',
})
export class QuestionnaireCarouselComponent implements OnInit {
  closeIcon = ICON_TYPE.CLOSE;
  config: SearchConfig = {
    pageSize: MAX_OCC_INTEGER_VALUE,
    currentPage: 0,
    sort: 'relevance',
  };
  readonly BREADCRUMB_GROUP_CRITERIA = 'facetName';
  defaultSearchQuery: string;
  searchResults$: Observable<any>;
  linkParams: { [key: string]: string };
  private subscription = new Subscription();

  constructor(
    protected productSearchService: ProductSearchService,
    protected componentData: CmsComponentData<FSQuestionnaireCarouselComponent>,
    protected route: ActivatedRoute,
    protected facetService: FacetService,
    protected routingService: RoutingService,
    protected checkoutService: FSCheckoutService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams
        .pipe(
          tap(params => {
            this.defaultSearchQuery = params['query'] ? params['query'] : '';
            this.productSearchService.search(
              this.defaultSearchQuery,
              this.config
            );
          })
        )
        .subscribe()
    );
    this.searchResults$ = combineLatest([
      this.componentData.data$,
      this.productSearchService.getResults(),
    ]).pipe(
      filter(([_, searchResults]) => !!searchResults.facets),
      map(([component, searchResults]) => {
        const breadcrumbs = this.groupBreadcrumbsByCriteria(
          searchResults.breadcrumbs,
          this.BREADCRUMB_GROUP_CRITERIA
        );
        return {
          component: component,
          pagination: searchResults.pagination,
          breadcrumbs: breadcrumbs,
          facets: searchResults.facets.map(facet => of(facet)),
          products: searchResults.products.filter(product =>
            component.categories.includes(
              (<FSProduct>product).defaultCategory?.code
            )
          ),
        };
      })
    );
  }

  closeActiveFacets(breadcrumb: Breadcrumb) {
    this.linkParams = this.facetService.getLinkParams(
      breadcrumb.removeQuery?.query?.value
    );
    this.routingService.go(['questionnaire'], this.linkParams);
  }

  startCheckout(product: FSProduct) {
    this.checkoutService.startCheckoutForProduct(product);
  }

  protected groupBreadcrumbsByCriteria(
    breadcrumbs: Breadcrumb[],
    criteria: string
  ) {
    return breadcrumbs.reduce((breadcrumb, item) => {
      const groupCriteria = item[criteria];
      breadcrumb[groupCriteria] = breadcrumb[groupCriteria] || [];
      breadcrumb[groupCriteria].push(item);
      return breadcrumb;
    }, {});
  }
}
