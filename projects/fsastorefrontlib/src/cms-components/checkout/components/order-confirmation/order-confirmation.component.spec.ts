import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, OccConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { FSCheckoutService } from './../../../../core/checkout/facade/checkout.service';
import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { OrderConfirmationComponent } from './order-confirmation.component';

class FSCheckoutServiceStub {
  orderPlaced: boolean;
  getOrderDetails() {}
  clearCheckoutData() {}
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      legacy: false,
    },
  },
};

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let checkoutService: FSCheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, AccordionModule, I18nTestingModule],
      declarations: [OrderConfirmationComponent],
      providers: [
        {
          provide: FSCheckoutService,
          useClass: FSCheckoutServiceStub,
        },
        {
          provide: OccConfig,
          useValue: MockOccModuleConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkoutService = TestBed.get(FSCheckoutService as Type<FSCheckoutService>);
    spyOn(checkoutService, 'getOrderDetails').and.stub();
    spyOn(checkoutService, 'clearCheckoutData').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get base url', () => {
    const baseUrl = component.getBaseUrl();
    expect(baseUrl).toEqual('');
  });
});
