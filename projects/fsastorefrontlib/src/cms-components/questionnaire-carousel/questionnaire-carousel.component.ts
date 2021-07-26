import { Component, OnInit } from '@angular/core';
import {
  Breadcrumb,
  LanguageService,
  ProductSearchService,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import {
  CmsComponentData,
  FacetService,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CmsQuestionnaireCarouselComponent } from '../../occ/occ-models/cms-component.models';
import { ActivatedRoute } from '@angular/router';
import { FSProduct } from '../../occ';
import { FSCheckoutService } from '../../core/checkout/facade/checkout.service';
import { MAX_OCC_INTEGER_VALUE } from '../b2b/unit/units.config';
import { RECOMMENDED_PRODUCT } from '../../shared';

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
  config: SearchConfig = {
    pageSize: MAX_OCC_INTEGER_VALUE,
    currentPage: 0,
    sort: 'relevance',
  };

  constructor(
    protected componentData: CmsComponentData<
      CmsQuestionnaireCarouselComponent
    >,
    protected productSearchService: ProductSearchService,
    protected facetService: FacetService,
    protected checkoutService: FSCheckoutService,
    protected routingService: RoutingService,
    protected route: ActivatedRoute,
    protected languageService: LanguageService
  ) {}

  ngOnInit(): void {
    let language: string;
    this.subscription.add(
      this.route.queryParams
        .pipe(
          tap(params => {
            this.defaultSearchQuery = params.query ? params.query : '';
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
      this.languageService.getActive(),
    ]).pipe(
      filter(([_, searchResults, lang]) => !!searchResults.facets),
      map(([component, searchResults, lang]) => {
        if (language && language !== lang) {
          this.productSearchService.search(
            this.defaultSearchQuery,
            this.config
          );
        }
        language = lang;
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
    localStorage.setItem(RECOMMENDED_PRODUCT, product.code);
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
