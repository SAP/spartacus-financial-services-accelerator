import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  CmsSearchBoxComponent,
  I18nTestingModule,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  CmsComponentData,
  SearchBoxComponentService,
  SearchResults,
} from '@spartacus/storefront';
import { FSCheckoutService } from '../../../core/checkout/facade/checkout.service';
import { Observable, of } from 'rxjs';
import { FSSearchBoxComponent } from './search-box.component';
import { DebugElement } from '@angular/core';

import createSpy = jasmine.createSpy;

const mockSearchBoxComponentData: CmsSearchBoxComponent = {
  uid: '001',
  typeCode: 'FSSearchBoxComponent ',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  name: 'Mock SearchBox',
  displayProductImages: true,
  displayProducts: true,
  displaySuggestions: true,
  container: false,
  maxProducts: 5,
  maxSuggestions: 5,
  minCharactersBeforeRequest: 3,
  waitTimeBeforeRequest: 500,
};

class MockCmsComponentData {
  get data$(): Observable<CmsSearchBoxComponent> {
    return of();
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'cxFsHighlight',
})
class MockHighlightPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-fs-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-fs-media',
  template: '<img>',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
  @Input() alt;
}

class MockFSCheckoutService {
  startCheckoutForProduct() {}
}

class MockRoutingService {
  go = createSpy();
}

describe('FSSearchBoxComponent', () => {
  let component: FSSearchBoxComponent;
  let fixture: ComponentFixture<FSSearchBoxComponent>;
  let serviceSpy: SearchBoxComponentService;
  let cmsComponentData: CmsComponentData<CmsSearchBoxComponent>;
  let element: DebugElement;
  let mockRoutingService: RoutingService;
  let mockFSCheckoutService: FSCheckoutService;

  class SearchBoxComponentServiceSpy {
    launchSearchPage = jasmine.createSpy('launchSearchPage');
    getResults = jasmine.createSpy('search').and.callFake(() =>
      of(<SearchResults>{
        suggestions: ['te', 'test'],
        message: 'I found stuff for you!',
        products: [
          {
            name: 'title 1',
          },
        ],
      })
    );

    search() {}
    toggleBodyClass() {}
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          RouterModule.forRoot([]),
          I18nTestingModule,
        ],
        declarations: [
          FSSearchBoxComponent,
          MockUrlPipe,
          MockHighlightPipe,
          MockCxIconComponent,
          MockMediaComponent,
        ],
        providers: [
          {
            provide: WindowRef,
            useValue: {},
          },
          {
            provide: CmsComponentData,
            useClass: MockCmsComponentData,
          },
          {
            provide: SearchBoxComponentService,
            useClass: SearchBoxComponentServiceSpy,
          },
          {
            provide: FSCheckoutService,
            useClass: MockFSCheckoutService,
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
    cmsComponentData = TestBed.inject(CmsComponentData);
    mockRoutingService = TestBed.inject(RoutingService);
    mockFSCheckoutService = TestBed.inject(FSCheckoutService);

    spyOnProperty(cmsComponentData, 'data$').and.returnValue(
      of(mockSearchBoxComponentData)
    );

    fixture = TestBed.createComponent(FSSearchBoxComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    serviceSpy = fixture.debugElement.injector.get(
      SearchBoxComponentService
    ) as any;

    spyOn(component, 'search').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
