import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Address,
  GlobalMessageService,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import {
  AddressBookComponentService,
  CardModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FSAddressInfoComponent } from './address-info.component';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

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
  uid: '1234',
};

const isLoading = new BehaviorSubject<boolean>(false);

class MockComponentService {
  loadAddresses = jasmine.createSpy();
  addUserAddress = jasmine.createSpy();
  updateUserAddress = jasmine.createSpy();
  deleteUserAddress = jasmine.createSpy();
  setAddressAsDefault = jasmine.createSpy();
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

@Component({
  selector: 'cx-fs-address-form',
  template: '',
})
class MockAddressFormComponent {
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

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

describe('FSAddressInfoComponent', () => {
  let component: FSAddressInfoComponent;
  let fixture: ComponentFixture<FSAddressInfoComponent>;
  let el: DebugElement;
  let addressBookComponentService: AddressBookComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SpinnerModule,
          I18nTestingModule,
          CardModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: AddressBookComponentService,
            useClass: MockComponentService,
          },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          {
            provide: UserAccountFacade,
            useClass: MockUserAccountFacade,
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
    addressBookComponentService = TestBed.inject(AddressBookComponentService);

    isLoading.next(false);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner if addresses are loading', () => {
    isLoading.next(true);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show address cards after loading', () => {
    expect(el.query(By.css('cx-card'))).toBeTruthy();
  });

  it('should address cards number to be equal with addresses count', () => {
    expect(el.queryAll(By.css('cx-card')).length).toEqual(3);
  });

  it('should call addAddressButtonHandle()', () => {
    component.addAddressButtonHandle();

    expect(component.addAddressButtonHandle).toHaveBeenCalledWith();
  });

  it('should call editAddressButtonHandle(address: Address)', () => {
    spyOn(component, 'editAddressButtonHandle');
    component.editAddressButtonHandle(mockAddress);

    expect(component.editAddressButtonHandle).toHaveBeenCalledWith(mockAddress);
  });

  it('should call addAddressSubmit(address: Address)', () => {
    spyOn(component, 'addAddressSubmit');
    component.addAddressSubmit(mockAddress);

    expect(component.addAddressSubmit).toHaveBeenCalledWith(mockAddress);
  });

  it('should call addAddressCancel()', () => {
    spyOn(component, 'addAddressCancel');
    component.addAddressCancel();

    expect(component.addAddressCancel).toHaveBeenCalledWith();
  });

  it('should call editAddressSubmit(address: Address)', () => {
    spyOn(component, 'editAddressSubmit');
    component.editAddressSubmit(mockAddress);

    expect(component.editAddressSubmit).toHaveBeenCalledWith(mockAddress);
  });

  it('should call editAddressCancel()', () => {
    spyOn(component, 'editAddressCancel');
    component.editAddressCancel();

    expect(component.editAddressCancel).toHaveBeenCalledWith();
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

  it('should display default label on address default', () => {
    mockAddress.defaultAddress = true;
    fixture.detectChanges();
    const element = el.query(By.css('.card-header'));
    expect(element.nativeElement.textContent).toContain(
      ' ✓ addressCard.default '
    );
  });

  describe('setAddressAsDefault', () => {
    it('should set Address as default', () => {
      component.setAddressAsDefault(mockAddress);
      expect(
        addressBookComponentService.setAddressAsDefault
      ).toHaveBeenCalledWith(mockAddress.id);
    });
  });

  describe('deleteAddress', () => {
    it('should set delete user Address', () => {
      component.deleteAddress('1');
      expect(
        addressBookComponentService.deleteUserAddress
      ).toHaveBeenCalledWith('1');
    });
  });
});
