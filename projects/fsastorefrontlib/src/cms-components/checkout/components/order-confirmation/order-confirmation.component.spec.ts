import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, OccConfig, Order } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { FSCheckoutService } from './../../../../core/checkout/facade/checkout.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { OrderConfirmationComponent } from './order-confirmation.component';

const mockEntries = [
  {
    entryNumber: 1,
    product: {
      code: 'testProduct',
      configurable: true,
    },
  },
];
class FSCheckoutServiceStub {
  orderPlaced: boolean;
  getOrderDetails() {}
  clearCheckoutData() {}
  filterRemoveableEntries() {
    return mockEntries;
  }
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockFSTranslationService {
  getTranslationValue() {}
}

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let checkoutService: FSCheckoutService;
  let translationService: FSTranslationService;

  beforeEach(
    waitForAsync(() => {
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
          {
            provide: FSTranslationService,
            useClass: MockFSTranslationService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    translationService = TestBed.inject(FSTranslationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkoutService = TestBed.inject(FSCheckoutService);
    spyOn(checkoutService, 'getOrderDetails').and.stub();
    spyOn(checkoutService, 'clearCheckoutData').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get base url', () => {
    const baseUrl = component.baseUrl;
    expect(baseUrl).toEqual('');
  });

  it('should get form content', () => {
    const testContent =
      '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}';
    const mockOrder = {
      code: 'testOrder',
      entries: [
        {
          entryNumber: 1,
          formData: [
            {
              id: 'formData1',
              content: testContent,
            },
          ],
          product: {
            code: 'testProduct',
            configurable: true,
          },
        },
      ],
    };
    expect(component.getFormContent(mockOrder)).toEqual(
      JSON.parse(testContent)
    );
  });

  it('should not get form content when order is empty', () => {
    const mockOrder = {};
    expect(component.getFormContent(mockOrder)).toEqual(undefined);
  });

  it('should not get form content when there is no order', () => {
    expect(component.getFormContent(undefined)).toEqual(undefined);
  });

  it('should find translation for key', () => {
    const orderConfirmationValue = 'order confirmation value';
    spyOn(translationService, 'getTranslationValue').and.returnValue(
      orderConfirmationValue
    );
    const translationValue = component.getTranslation(
      'translation_group',
      'translation_value'
    );
    expect(translationValue).toEqual(orderConfirmationValue);
  });

  it('should check if removable entries exist', () => {
    const mockOrder = {
      code: 'testOrder',
      entries: [
        {
          entryNumber: 1,
          product: {
            code: 'testProduct',
            configurable: true,
          },
        },
      ],
    };
    expect(component.checkIfRemoveableEntriesExists(mockOrder)).toEqual(true);
  });
});
