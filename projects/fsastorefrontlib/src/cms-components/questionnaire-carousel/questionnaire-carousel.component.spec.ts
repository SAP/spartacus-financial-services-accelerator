import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  ProductSearchService,
  RoutingService,
  CmsComponent,
  TranslationService,
  I18nTestingModule,
} from '@spartacus/core';
import { CmsComponentData, FacetService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { QuestionnaireCarouselComponent } from './questionnaire-carousel.component';
import { Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FSQuestionnaireCarouselComponent } from '../../occ/occ-models/cms-component.models';
import { FSCheckoutService } from '../../core';

const mockProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};
const mockSearchResults = {
  breadcrumbs: [
    {
      facetCode: 'life_situation',
      facetName: 'Choose one or multiple events',
      facetValueCode: 'New Loan',
      facetValueName: 'New Loan',
      removeQuery: {
        query: {
          value: 'insurances:relevance',
        },
        url: '/search?q=insurances%3Arelevance',
      },
    },
  ],
  facets: [
    {
      category: false,
      multiSelect: false,
      name: 'Do you want to insure your partner',
      priority: 2147483646,
      topValueCount: 6,
      visible: true,
      values: [
        {
          count: 5,
          name: 'Yes',
          query: {
            query: {
              value: 'insurances:relevance:partner_protection:Yes',
            },
            url: '/search?q=insurances%3Arelevance%3Apartner_protection%3AYes',
          },
          selected: false,
        },
      ],
    },
  ],
  products: [
    {
      code: 'TEST_PRODUCT_1',
      defaultCategory: {
        code: 'category1',
      },
    },
    {
      code: 'TEST_PRODUCT_2',
      defaultCategory: {
        code: 'category2',
      },
    },
  ],
};
const mockBreadcrumb = {
  facetCode: 'life_situation',
  facetName: 'Choose one or multiple events',
  facetValueCode: 'New Loan',
  facetValueName: 'New Loan',
  removeQuery: {
    query: {
      value: 'insurances:relevance',
    },
    url: '/search?q=insurances%3Arelevance%3Aterminal_ill%3AYes',
  },
};
const mockLinkParams = {
  query: 'insurances:relevance',
};
const mockCategories = 'category1 category2';
const componentData: FSQuestionnaireCarouselComponent = {
  categories: mockCategories,
  title: 'Test title',
};
const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};
const mockParams = '';

@Component({
  // tslint:disable
  selector: 'cx-carousel',
  template: `
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      ></ng-container>
    </ng-container>
  `,
})
class MockCarouselComponent {
  @Input() items;
  @Input() template;
  itemWidth;
}

@Component({
  selector: 'cx-facet',
  template: '',
})
class MockFacetComponent {
  @Input() facet;
}

class MockProductSearchService {
  search() {}
  getResults() {
    return of(mockSearchResults);
  }
}
class MockActivatedRoute {
  queryParams = of(mockParams);
}
class MockFacetService {
  getLinkParams() {
    return mockLinkParams;
  }
}
class MockRoutingService {
  go() {}
}
class MockTranslationService {
  translate(key): Observable<string> {
    return of(key);
  }
}
class MockCheckoutService {
  startCheckoutForProduct() {}
}

describe('QuestionnaireCarouselComponent', () => {
  let component: QuestionnaireCarouselComponent;
  let fixture: ComponentFixture<QuestionnaireCarouselComponent>;
  let mockProductSearchService: ProductSearchService;
  let mockFacetService: FacetService;
  let mockActivatedRoute: ActivatedRoute | MockActivatedRoute;
  let mockCheckoutService: FSCheckoutService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          QuestionnaireCarouselComponent,
          MockCarouselComponent,
          MockFacetComponent,
        ],
        providers: [
          {
            provide: ProductSearchService,
            useClass: MockProductSearchService,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: FacetService,
            useClass: MockFacetService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
          {
            provide: FSCheckoutService,
            useClass: MockCheckoutService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockProductSearchService = TestBed.inject(ProductSearchService);
    routingService = TestBed.inject(RoutingService);
    mockFacetService = TestBed.inject(FacetService);
    mockActivatedRoute = TestBed.inject(ActivatedRoute);
    mockCheckoutService = TestBed.inject(FSCheckoutService);
    spyOn(routingService, 'go').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search results', () => {
    component.ngOnInit();
    let searchResult;
    component.searchResults$
      .subscribe(data => {
        searchResult = data;
      })
      .unsubscribe();
    console.log('blaa', searchResult);
    expect(searchResult.products.length).toEqual(2);
    expect(searchResult.products[0].code).toEqual('TEST_PRODUCT_1');
    expect(searchResult.component.categories).toBe(mockCategories);
  });

  it('should close active facets', () => {
    spyOn(mockFacetService, 'getLinkParams').and.callThrough();
    component.closeActiveFacets(mockBreadcrumb);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should start checkout for product', () => {
    spyOn(mockCheckoutService, 'startCheckoutForProduct').and.callThrough();
    component.startCheckout(mockProduct);
    expect(mockCheckoutService.startCheckoutForProduct).toHaveBeenCalled();
  });
});
