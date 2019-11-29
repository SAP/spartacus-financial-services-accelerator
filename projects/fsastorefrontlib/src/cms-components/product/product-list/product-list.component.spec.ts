import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSProductListComponent } from './product-list.component';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  PageLayoutService,
  ProductListComponentService,
  ViewConfig,
} from '@spartacus/storefront';
import createSpy = jasmine.createSpy;

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
  transform() { }
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
