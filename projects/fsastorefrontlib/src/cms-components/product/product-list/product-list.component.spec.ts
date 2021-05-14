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
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockModel = {
  pagination: {
    currentPage: 0,
    pageSize: 10,
    sort: 'relevance',
    totalPages: 1,
    totalResults: 1,
  },
  products: [
    {
      code: 'testCode1',
      defaultCategory: {
        code: 'banking_testCode',
        parentCategory: {
          code: 'testParentCode',
        },
      },
    },
  ],
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

export class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort').and.returnValue('relevance');
  clearSearchResults = createSpy('clearSearchResults');
  model$ = of(mockModel);
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

class MockRoutingService {
  go = createSpy();
}

describe('ProductListComponent', () => {
  let component: FSProductListComponent;
  let fixture: ComponentFixture<FSProductListComponent>;
  let el: DebugElement;
  let mockRoutingService: RoutingService;

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
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
      mockRoutingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSProductListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to get a quote for product', () => {
    const getQuoteButton: HTMLElement = el.query(By.css('.primary-button'))
      .nativeElement;
    getQuoteButton.click();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'category',
      params: { code: 'banking_testCode' },
    });
  });
});
