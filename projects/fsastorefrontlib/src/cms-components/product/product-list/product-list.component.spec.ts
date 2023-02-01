import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSProductListComponent } from './product-list.component';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  PageLayoutService,
  ProductListComponentService,
  ViewConfig,
  ListNavigationModule,
} from '@spartacus/storefront';
import createSpy = jasmine.createSpy;
import { FSCheckoutService } from './../../../core/checkout/facade/checkout.service';
import { GlobalMessageService } from '@spartacus/core';

const mockProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};
@Component({
  // eslint-disable-next-line
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

class MockCheckoutService {
  startCheckoutForProduct() {}
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

class MockGlobalMessageService {
  add = createSpy();
}

describe('ProductListComponent', () => {
  let component: FSProductListComponent;
  let fixture: ComponentFixture<FSProductListComponent>;
  let checkoutService: FSCheckoutService;

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
            provide: FSCheckoutService,
            useClass: MockCheckoutService,
          },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSProductListComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(FSCheckoutService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start checkout for product', () => {
    spyOn(checkoutService, 'startCheckoutForProduct').and.callThrough();
    component.startCheckout(mockProduct);
    expect(checkoutService.startCheckoutForProduct).toHaveBeenCalled();
  });
});
