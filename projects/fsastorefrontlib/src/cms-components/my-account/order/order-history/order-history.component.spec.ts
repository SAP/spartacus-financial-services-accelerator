import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Cart,
  I18nTestingModule,
  OrderHistoryList,
  RoutingService,
  TranslationService,
  UserOrderService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FSOrderHistoryComponent } from './order-history.component';

const mockOrders: OrderHistoryList | Cart = <OrderHistoryList | Cart>{
  orders: [
    {
      code: '1',
      placed: new Date('2018-01-01'),
      statusDisplay: 'test',
      total: { formattedValue: '1' },
      entries: [
        {
          product: {
            name: 'Test Product',
          },
        },
      ],
    },
    {
      code: '2',
      placed: new Date('2018-01-02'),
      statusDisplay: 'test2',
      total: { formattedValue: '2' },
      entries: [
        {
          product: {
            name: 'Test Product 2',
          },
        },
      ],
    },
  ],
  pagination: { totalResults: 1, totalPages: 2, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

const mockEmptyOrderList: OrderHistoryList = {
  orders: [],
  pagination: { totalResults: 0, totalPages: 1 },
};

const mockOrderHistoryList$ = new BehaviorSubject<OrderHistoryList | Cart>(
  mockOrders
);

@Component({
  template: '',
  selector: 'cx-fs-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Component({
  template: '',
  selector: 'cx-fs-sorting',
})
class MockSortingComponent {
  @Input() sortOptions;
  @Input() sortLabels;
  @Input() selectedOption;
  @Input() placeholder;
  @Output() sortListEvent = new EventEmitter<string>();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserOrderService {
  getOrderHistoryList(): Observable<OrderHistoryList | Cart> {
    return mockOrderHistoryList$.asObservable();
  }
  getOrderHistoryListLoaded(): Observable<boolean> {
    return of(true);
  }
  loadOrderList(
    _userId: string,
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}
  clearOrderList() {}
}

class MockRoutingService {
  go() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

class MockUserReplenishmentOrderService {
  getReplenishmentOrderDetails(): Observable<any> {
    return of();
  }
}

describe('FSOrderHistoryComponent', () => {
  let component: FSOrderHistoryComponent;
  let fixture: ComponentFixture<FSOrderHistoryComponent>;
  let userService: UserOrderService | MockUserOrderService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          FSOrderHistoryComponent,
          MockUrlPipe,
          MockPaginationComponent,
          MockSortingComponent,
        ],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: UserOrderService, useClass: MockUserOrderService },
          { provide: TranslationService, useClass: MockTranslationService },
          {
            provide: UserReplenishmentOrderService,
            useClass: MockUserReplenishmentOrderService,
          },
        ],
      }).compileComponents();

      userService = TestBed.inject(UserOrderService);
      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSOrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correctly sort code', () => {
    spyOn(userService, 'loadOrderList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(userService.loadOrderList).toHaveBeenCalledWith(
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(userService, 'loadOrderList').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    expect(userService.loadOrderList).toHaveBeenCalledWith(5, 1, 'byDate');
  });

  it('should display pagination', () => {
    mockOrderHistoryList$.next(mockOrders);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(2);
  });

  it('should NOT display pagination', () => {
    mockOrderHistoryList$.next(mockEmptyOrderList);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(
      By.css('.cx-order-history-pagination')
    );

    expect(elements.length).toEqual(0);
  });

  it('should clear order history data when component destroy', () => {
    spyOn(userService, 'clearOrderList').and.stub();

    component.ngOnDestroy();
    expect(userService.clearOrderList).toHaveBeenCalledWith();
  });
});
