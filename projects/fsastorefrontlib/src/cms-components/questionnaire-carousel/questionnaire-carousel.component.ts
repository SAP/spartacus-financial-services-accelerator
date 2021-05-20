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
  defaultSearchQuery: string;
  searchResults$: Observable<any>;
  linkParams: { [key: string]: string };
  private subscription = new Subscription();

  constructor(
    protected productSearchService: ProductSearchService,
    protected componentData: CmsComponentData<FSQuestionnaireCarouselComponent>,
    protected route: ActivatedRoute,
    protected facetService: FacetService,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams
        .pipe(
          tap(params => {
            this.defaultSearchQuery = params['query']
              ? params['query']
              : 'insurances';
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
      filter(
        ([component, searchResults]) => Object.keys(searchResults).length !== 0
      ),
      map(([component, searchResults]) => {
        const breadcrumbs = this.groupBreadcrumbs(
          searchResults.breadcrumbs,
          'facetName'
        );
        return {
          component: component,
          breadcrumbs:
            searchResults.breadcrumbs.length !== 0 ? breadcrumbs : null,
          facets:
            searchResults.facets.length !== 0
              ? searchResults.facets.map(f => of(f))
              : null,
          products: searchResults.products.filter(product =>
            component.categories.includes(product['defaultCategory'].code)
          ),
        };
      })
    );
  }

  groupBreadcrumbs(breadcrumbs, key) {
    return breadcrumbs.reduce((breadcrumb, item) => {
      const groupCriteria = item[key];
      breadcrumb[groupCriteria] = breadcrumb[groupCriteria] || [];
      breadcrumb[groupCriteria].push(item);
      return breadcrumb;
    }, {});
  }

  closeActiveFacets(breadcrumb: Breadcrumb) {
    this.linkParams = this.facetService.getLinkParams(
      breadcrumb.removeQuery?.query?.value
    );
    this.routingService.go(['questionnaire'], this.linkParams);
  }
}
