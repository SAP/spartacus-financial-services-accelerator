import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import {
  Address,
  Country,
  I18nTestingModule,
  Region,
  UserAddressService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { FSAddressService } from '../../core/user/facade/address.service';
import { FSUserRole } from '../../occ/occ-models/occ.models';
import { UserChangeAddressComponent } from './user-change-address.component';

const country = { isocode: 'AT', name: 'Austria' };
const mockCountries: Country[] = [
  {
    isocode: 'AD',
    name: 'Andorra',
  },
  {
    isocode: 'RS',
    name: 'Serbia',
  },
];
const mockRegions: Region[] = [
  { isocode: 'CA-AB', isocodeShort: 'AB', name: 'Alberta' },
];
const firstName = 'Donna';
const lastName = 'Moore';
const defaultAddress: Address = {
  firstName: firstName,
  lastName: lastName,
  postalCode: '11000',
  town: 'Belgrade',
  defaultAddress: true,
  id: 'addressMockId',
  line1: 'line1',
  line2: 'line2',
  region: { isocode: 'JP-27' },
  country: { isocode: 'JP' },
};
const roles = [FSUserRole.SELLER];
const mockCustomer = {
  customerId: 'testuser',
  firstName: firstName,
  lastName: lastName,
  defaultAddress: defaultAddress,
  roles: roles,
  name: firstName + ' ' + lastName,
};

class MockFSAddressService {
  getCountries() {
    return of({ values: mockCountries });
  }
}

class MockUserAddressService {
  getRegions(): Observable<Region[]> {
    return of(mockRegions);
  }
}

class MockConsentService {
  userAddressAdded$ = new BehaviorSubject(true);
  selectedCountry$ = new BehaviorSubject(true);
  setSelectedCountry() {}
  setUserAddressAdded() {}
  createAddressForUser(): void {}
  updateAddressForUser() {
    return of();
  }
}

describe('UserChangeAddressComponent', () => {
  let component: UserChangeAddressComponent;
  let fixture: ComponentFixture<UserChangeAddressComponent>;
  let fSAddressService: FSAddressService;
  let userAddressService: UserAddressService;
  let fsConsentService: ConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [UserChangeAddressComponent],
      providers: [
        UntypedFormBuilder,
        {
          provide: FSAddressService,
          useClass: MockFSAddressService,
        },
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
        {
          provide: ConsentService,
          useClass: MockConsentService,
        },
      ],
    }).compileComponents();

    fSAddressService = TestBed.inject(FSAddressService);
    userAddressService = TestBed.inject(UserAddressService);
    fsConsentService = TestBed.inject(ConsentService);
    fixture = TestBed.createComponent(UserChangeAddressComponent);
    component = fixture.componentInstance;
    component.customer = mockCustomer;
    fixture.detectChanges();
    spyOn(component.actionChange, 'emit');
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel address change', () => {
    component.cancel();
    expect(component.actionChange.emit).toHaveBeenCalled();
  });

  it('should select country', () => {
    component.countrySelected(country);
    expect(component.addressForm.get('country').get('isocode').value).toEqual(
      country.isocode
    );
  });

  it('should update address', () => {
    spyOn(fsConsentService, 'updateAddressForUser').and.callThrough();
    component.changeAddress();
    expect(fsConsentService.updateAddressForUser).toHaveBeenCalled();
  });

  it('should add address', () => {
    component.customer.defaultAddress = null;
    spyOn(fsConsentService, 'createAddressForUser').and.callThrough();
    component.changeAddress();
    expect(fsConsentService.createAddressForUser).toHaveBeenCalled();
  });

  it('should not change addres if form is invalid', () => {
    component.addressForm.get('town').setValue('');
    spyOn(fsConsentService, 'updateAddressForUser').and.callThrough();
    component.changeAddress();
    expect(fsConsentService.updateAddressForUser).not.toHaveBeenCalled();
  });
});
