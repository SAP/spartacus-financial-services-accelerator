import { Component, OnInit } from '@angular/core';
import {
  Breadcrumb,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import {
  CmsComponentData,
  FacetService,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FSQuestionnaireCarouselComponent } from '../../occ/occ-models/cms-component.models';
import { ActivatedRoute } from '@angular/router';
import { FSProduct } from '../../occ';
import { FSCheckoutService } from '../../core/checkout/facade/checkout.service';

@Component({
  selector: 'cx-fs-questionnaire-carousel',
  templateUrl: './questionnaire-carousel.component.html',
})
export class QuestionnaireCarouselComponent implements OnInit {
  closeIcon = ICON_TYPE.CLOSE;
  readonly BREADCRUMB_GROUP_CRITERIA = 'facetName';
  defaultSearchQuery: string;
  searchResults$: Observable<any>;
  linkParams: { [key: string]: string };
  subscription = new Subscription();

  constructor(
    protected componentData: CmsComponentData<FSQuestionnaireCarouselComponent>,
    protected productSearchService: ProductSearchService,
    protected facetService: FacetService,
    protected checkoutService: FSCheckoutService,
    protected routingService: RoutingService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams
        .pipe(
          tap(params => {
            this.defaultSearchQuery = params.query ? params.query : '';
            this.productSearchService.search(this.defaultSearchQuery);
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
