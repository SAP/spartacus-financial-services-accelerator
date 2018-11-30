import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

import { CheckoutService } from '../../../../facade/checkout.service';
import { Address } from '../../../../models/address-model';
import { PaymentFormComponent } from './payment-form.component';

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};

const mockCardTypes = [
  {
    code: 'amex',
    name: 'American Express'
  },
  {
    isocode: 'maestro',
    name: 'Maestro'
  }
];

@Component({
  selector: 'cx-card',
  template: ''
})
class MockCardComponent {
  @Input()
  content: any;
}

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let mockCheckoutService: any;
  let controls: FormGroup['controls'];

  beforeEach(async(() => {
    mockCheckoutService = {
      cardTypes$: new BehaviorSubject([]),
      deliveryAddress$: new BehaviorSubject(null),
      loadSupportedCardTypes: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule],
      declarations: [PaymentFormComponent, MockCardComponent],
      providers: [{ provide: CheckoutService, useValue: mockCheckoutService }]
    })
      .overrideComponent(PaymentFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    controls = component.payment.controls;

    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backToPayment, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get suppored card types if they do not exist', done => {
    mockCheckoutService.cardTypes$.next([]);
    component.ngOnInit();
    component.cardTypes$.subscribe(() => {
      expect(mockCheckoutService.loadSupportedCardTypes).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get suppored card types if they exist', () => {
    mockCheckoutService.cardTypes$.next(mockCardTypes);
    component.ngOnInit();
    let cardTypes;
    component.cardTypes$.subscribe(data => {
      cardTypes = data;
    });
    expect(cardTypes).toBe(mockCardTypes);
  });

  it('should call ngOnInit to get shipping address set in cart', () => {
    mockCheckoutService.cardTypes$.next(mockCardTypes);
    mockCheckoutService.deliveryAddress$.next(mockAddress);
    component.ngOnInit();
    let cardTypes;
    component.cardTypes$.subscribe(data => {
      cardTypes = data;
    });
    let address;
    component.shippingAddress$.subscribe(data => {
      address = data;
    });
    expect(cardTypes).toBe(mockCardTypes);
    expect(address).toBe(mockAddress);
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.payment.value.defaultPayment = false;
    component.toggleDefaultPaymentMethod();
    expect(component.payment.value.defaultPayment).toBeTruthy();
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.payment.value.defaultPayment = true;
    component.toggleDefaultPaymentMethod();
    expect(component.payment.value.defaultPayment).toBeFalsy();
  });

  it('should call next()', () => {
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith(
      component.payment.value
    );
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToPayment.emit).toHaveBeenCalled();
  });

  it('should call paymentSelected(card)', () => {
    component.paymentSelected({ code: 'test select payment' });
    expect(
      component.payment['controls'].cardType['controls'].code.value
    ).toEqual('test select payment');
  });

  it('should call monthSelected(month)', () => {
    component.monthSelected({ id: '05', name: '05' });
    expect(component.payment['controls'].expiryMonth.value).toEqual('05');
  });

  it('should call yearSelected(year)', () => {
    component.yearSelected({ name: '2022' });
    expect(component.payment['controls'].expiryYear.value).toEqual('2022');
  });

  it('should call getAddressCardContent(address)', () => {
    const card = component.getAddressCardContent(mockAddress);
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, JP',
      'zip',
      undefined
    ]);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    it('should call "next" function when being clicked and when form is valid', () => {
      mockCheckoutService.cardTypes$.next(mockCardTypes);
      mockCheckoutService.deliveryAddress$.next(mockAddress);

      spyOn(component, 'next');

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).not.toHaveBeenCalled();

      controls['accountHolderName'].setValue('test accountHolderName');
      controls['cardNumber'].setValue('test cardNumber');
      controls.cardType['controls'].code.setValue('test card type code');
      controls['expiryMonth'].setValue('test expiryMonth');
      controls['expiryYear'].setValue('test expiryYear');
      controls['cvn'].setValue('test cvn');

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });

    it('should be enabled only when form has all mandatory fields filled', () => {
      const isContinueBtnDisabled = () => {
        fixture.detectChanges();
        return getContinueBtn().nativeElement.disabled;
      };

      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['accountHolderName'].setValue('test accountHolderName');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['cardNumber'].setValue('test cardNumber');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.cardType['controls'].code.setValue('test card type code');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['expiryMonth'].setValue('test expiryMonth');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['expiryYear'].setValue('test expiryYear');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['cvn'].setValue('test cvn');

      expect(isContinueBtnDisabled()).toBeFalsy();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () => fixture.debugElement.query(By.css('.btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.back).toHaveBeenCalled();
    });
  });
});
