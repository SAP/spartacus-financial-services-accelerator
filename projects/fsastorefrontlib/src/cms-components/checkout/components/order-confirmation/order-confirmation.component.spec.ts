import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, OccConfig } from '@spartacus/core';
import { FSCheckoutService } from './../../../../core/checkout/facade/fs-checkout.service';
import { FsaOrderConfirmationComponent } from './order-confirmation.component';
import { SpinnerModule } from '@spartacus/storefront';

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
  let component: FsaOrderConfirmationComponent;
  let fixture: ComponentFixture<FsaOrderConfirmationComponent>;
  let checkoutService: FSCheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, AccordionModule, I18nTestingModule],
      declarations: [FsaOrderConfirmationComponent],
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
    fixture = TestBed.createComponent(FsaOrderConfirmationComponent);
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
