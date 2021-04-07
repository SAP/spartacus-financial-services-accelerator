import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
  Type,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Address,
  I18nTestingModule,
  User,
  UserAddressService,
  CheckoutDeliveryService,
  UserService,
} from '@spartacus/core';
import {
  AddressBookComponentService,
  CardModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FSAddressInfoComponent } from './address-info.component';

const mockAddress: Address = {
  id: 'addressMockId',
  firstName: 'John',
  lastName: 'Doe',
  line1: 'line1',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
  defaultAddress: true,
};

const mockUser: User = {
  uid: 'mockUser',
};

const isLoading = new BehaviorSubject<boolean>(false);

class MockComponentService {
  loadAddresses = jasmine.createSpy();
  addUserAddress = jasmine.createSpy();
  updateUserAddress = jasmine.createSpy();
  getAddressesStateLoading(): Observable<boolean> {
    return isLoading.asObservable();
  }
  getAddresses(): Observable<Address[]> {
    return of([mockAddress, mockAddress, mockAddress]);
  }
  getUserId(): Observable<string> {
    return of(mockUser.uid);
  }
}

class MockUserService {
  get(): Observable<User> {
    return of(mockUser);
  }
}

@Component({
  selector: 'cx-fs-address-form',
  template: '',
})
class MockAddressFormComponent {
  @Input()
  user: User;

  @Input()
  addressData: Address;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  setAsDefaultField: boolean;

  @Input()
  showTitleCode: boolean;

  @Input()
  showCancelBtn: boolean;

  @Output()
  submitAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();
}

class MockCheckoutDeliveryService {
  clearCheckoutDeliveryDetails = jasmine.createSpy();
}

class MockUserAddressService {
  deleteUserAddress = jasmine.createSpy();
  setAddressAsDefault = jasmine.createSpy();
}

describe('FSAddressInfoComponent', () => {
  let component: FSAddressInfoComponent;
  let fixture: ComponentFixture<FSAddressInfoComponent>;
  let el: DebugElement;
  let userAddressService: UserAddressService;
  let checkoutDeliveryService: CheckoutDeliveryService;
  let userService: UserService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SpinnerModule, I18nTestingModule, CardModule],
        providers: [
          {
            provide: AddressBookComponentService,
            useClass: MockComponentService,
          },
          { provide: UserAddressService, useClass: MockUserAddressService },
          {
            provide: CheckoutDeliveryService,
            useClass: MockCheckoutDeliveryService,
          },
          {
            provide: UserService,
            useClass: MockUserService,
          },
        ],
        declarations: [FSAddressInfoComponent, MockAddressFormComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSAddressInfoComponent);
    component = fixture.componentInstance;
    spyOn(component, 'addAddressButtonHandle');
    el = fixture.debugElement;
    userAddressService = TestBed.inject(
      UserAddressService as Type<UserAddressService>
    );
    checkoutDeliveryService = TestBed.inject(
      CheckoutDeliveryService as Type<CheckoutDeliveryService>
    );

    userService = TestBed.inject(UserService as Type<UserService>);

    isLoading.next(false);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner if address is loading', () => {
    isLoading.next(true);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show address card after loading', () => {
    expect(el.query(By.css('cx-card'))).toBeTruthy();
  });

  it('should call editAddressButtonHandle(address: Address)', () => {
    spyOn(component, 'editAddressButtonHandle');
    component.editAddressButtonHandle(mockAddress);
    expect(component.editAddressButtonHandle).toHaveBeenCalledWith(mockAddress);
  });

  it('should display address data', () => {
    const element = el.query(By.css('cx-card'));
    expect(element.nativeElement.textContent).toContain(
      mockAddress.firstName &&
        mockAddress.lastName &&
        mockAddress.line1 &&
        mockAddress.line2 &&
        mockAddress.town &&
        mockAddress.country.isocode &&
        mockAddress.postalCode
    );
  });

  describe('deleteAddress', () => {
    it('should set delete user Address', () => {
      component.deleteAddress('1');
      expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith('1');
    });
  });
});
