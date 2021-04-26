import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CurrencyService,
  I18nTestingModule,
  OrderEntry,
  RoutingService,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FSSteps, FSProduct } from './../../../../occ/occ-models/occ.models';
import { AddOptionsComponent } from './add-options.component';

const product: FSProduct = {
  defaultCategory: {
    code: 'insurances_auto',
  },
  configurable: false,
};

const mockEntries: OrderEntry[] = [
  {
    product: product,
  },
];

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

class MockCartService {
  isStable() {
    return of(true);
  }

  removeEntry() {}

  addOptionalProduct() {}

  getEntries(): Observable<OrderEntry[]> {
    return of(mockEntries);
  }
}

class MockCurrencyService {
  getActive() {
    return of('EUR');
  }
}

class MockRoutingService {
  go() {}
}

class MockCheckoutConfigService {}

@Pipe({
  name: 'cxSortByName',
})
class MockSortPipe implements PipeTransform {
  transform() {}
}

describe('AddOptionsComponent', () => {
  let component: AddOptionsComponent;
  let fixture: ComponentFixture<AddOptionsComponent>;
  let cartService: FSCartService;
  let routingService: RoutingService;
  let checkoutConfigService: FSCheckoutConfigService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          SpinnerModule,
          MediaModule,
          NgbTooltipModule,
        ],
        declarations: [AddOptionsComponent, MockSortPipe],
        providers: [
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: CurrencyService,
            useClass: MockCurrencyService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: FSCheckoutConfigService,
            useClass: MockCheckoutConfigService,
          },
          {
            provide: ActivatedRoute,
            useValue: {
              routeConfig: {
                path: 'checkout/add-options',
              },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cartService = TestBed.inject(FSCartService);
    spyOn(cartService, 'isStable').and.callThrough();

    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'addOptionalProduct').and.callThrough();
    spyOn(cartService, 'getEntries').and.callThrough();

    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();

    checkoutConfigService = TestBed.inject(FSCheckoutConfigService);

    component.ngOnInit();
    el = fixture.debugElement;
  });

  it('should create add options component', () => {
    expect(component).toBeTruthy();
  });

  it('should not remove product from cart', () => {
    component.removeProductFromCart(undefined);
    expect(cartService.removeEntry).not.toHaveBeenCalled();
  });

  it('should remove product from cart', () => {
    component.removeProductFromCart({});
    expect(cartService.removeEntry).toHaveBeenCalledWith({});
  });

  it('should not add product to cart', () => {
    component.addProductToCart(undefined, '1');
    expect(cartService.addOptionalProduct).not.toHaveBeenCalled();
  });

  it('should add product to cart', () => {
    component.addProductToCart('orderCode', '1');
    expect(cartService.addOptionalProduct).toHaveBeenCalledWith(
      'orderCode',
      1,
      '1'
    );
  });

  it('should go back', () => {
    component.ngOnInit();
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate next', () => {
    component.ngOnInit();
    component.navigateNext(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not render navigation buttons if next and previous steps are not defined', () => {
    checkoutConfigService.nextStep = undefined;
    checkoutConfigService.previousStep = undefined;
    component.ngOnInit();

    const previousButton = el.query(By.css('.action-button'));
    const nextButton = el.query(By.css('.primary-button'));
    expect(previousButton).not.toBeTruthy();
    expect(nextButton).not.toBeTruthy();
  });

  it('should set currentCurrency variable to EUR', () => {
    component.ngOnInit();
    expect(component.currentCurrency).toEqual('EUR');
  });
});
