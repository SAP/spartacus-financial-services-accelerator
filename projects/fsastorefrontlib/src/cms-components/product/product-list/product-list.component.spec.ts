import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSProductListComponent } from './product-list.component';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  PageLayoutService,
  ProductListComponentService,
  ViewConfig,
  ListNavigationModule,
} from '@spartacus/storefront';
import createSpy = jasmine.createSpy;
import { FSCheckoutStep } from '../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from '../../../core/checkout/services/checkout-config.service';

const mockInitialStep: FSCheckoutStep = {
  id: 'chooseCoverStep',
  routeName: 'generalInformation',
  name: 'Mock initial step',
  type: [],
};

const mockProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};
@Component({
  // tslint:disable
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockPageLayoutService {
  getSlots(): Observable<string[]> {
    return of(['LogoSlot']);
  }
  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
  }
}

class MockCheckoutConfigService {
  getInitialStepForCategory(): FSCheckoutStep {
    return mockInitialStep;
  }
}

class MockRoutingService {
  go = createSpy();
}

export class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  clearSearchResults = createSpy('clearSearchResults');
  model$ = of({});
}

export class MockViewConfig {
  view = {
    infiniteScroll: {
      active: true,
      productLimit: 0,
      showMoreButton: false,
    },
  };
}

describe('ProductListComponent', () => {
  let component: FSProductListComponent;
  let fixture: ComponentFixture<FSProductListComponent>;
  let checkoutConfigService: FSCheckoutConfigService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, ListNavigationModule],
        declarations: [FSProductListComponent, MockMediaComponent, MockUrlPipe],
        providers: [
          {
            provide: PageLayoutService,
            useClass: MockPageLayoutService,
          },
          {
            provide: ProductListComponentService,
            useClass: MockProductListComponentService,
          },
          {
            provide: ViewConfig,
            useClass: MockViewConfig,
          },
          {
            provide: FSCheckoutConfigService,
            useClass: MockCheckoutConfigService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSProductListComponent);
    component = fixture.componentInstance;
    checkoutConfigService = TestBed.inject(FSCheckoutConfigService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start checkout for product when initial step is category based', () => {
    component.startCheckoutForProduct(mockProduct);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: mockInitialStep.routeName,
      params: { code: mockProduct.defaultCategory.code },
    });
  });

  it('should start checkout for product', () => {
    const productConfigureStep = {
      id: 'productConfigureStep',
      routeName: 'productConfigure',
      name: 'Mock product configuration step',
      type: [],
    };
    spyOn(checkoutConfigService, 'getInitialStepForCategory').and.returnValue(
      productConfigureStep
    );
    component.startCheckoutForProduct(mockProduct);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: productConfigureStep.routeName,
      params: { code: mockProduct.code },
    });
  });
});
