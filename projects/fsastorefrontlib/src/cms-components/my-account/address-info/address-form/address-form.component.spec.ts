import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Address,
  Country,
  GlobalMessageService,
  I18nTestingModule,
  Region,
  Title,
  User,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { FormErrorsModule, ModalService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSAddressFormComponent } from './address-form.component';
import createSpy = jasmine.createSpy;
import { FSAddressService } from '../../../../core/user/facade/address.service';

const mockRegions: Region[] = [
  { isocode: 'CA-AB', isocodeShort: 'AB', name: 'Alberta' },
];
const mockUser: User = {
  firstName: 'John',
  lastName: 'Doe',
};
const mockAddress: Address = {
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
const country = { key: 'AT', value: 'Austria' };
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

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of();
  }
  loadTitles(): void {}
}

class MockUserAddressService {
  getDeliveryCountries(): Observable<Country[]> {
    return of();
  }
  loadDeliveryCountries(): void {}
  getRegions(): Observable<Region[]> {
    return of(mockRegions);
  }
  getAddresses(): Observable<Address[]> {
    return of([]);
  }
}

class MockModalService {
  open(): any {}
}

class MockFSAddressService {
  getCountries() {
    return of();
  }
}

describe('FSAddressFormComponent', () => {
  let component: FSAddressFormComponent;
  let fixture: ComponentFixture<FSAddressFormComponent>;
  let controls: FormGroup['controls'];

  let userAddressService: UserAddressService;
  let userService: UserService;
  let mockGlobalMessageService: any;
  let mockModalService: MockModalService;
  let fSAddressService: FSAddressService;

  beforeEach(
    waitForAsync(() => {
      mockGlobalMessageService = {
        add: createSpy(),
      };
      mockModalService = new MockModalService();

      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
        declarations: [FSAddressFormComponent],
        providers: [
          { provide: ModalService, useValue: { open: () => {} } },
          { provide: UserService, useClass: MockUserService },
          { provide: FSAddressService, useClass: MockFSAddressService },
          { provide: UserAddressService, useClass: MockUserAddressService },
          { provide: GlobalMessageService, useValue: mockGlobalMessageService },
          { provide: ModalService, useClass: MockModalService },
        ],
      })
        .overrideComponent(FSAddressFormComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      userService = TestBed.inject(UserService);
      userAddressService = TestBed.inject(UserAddressService);
      fSAddressService = TestBed.inject(FSAddressService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSAddressFormComponent);
    component = fixture.componentInstance;
    controls = component.addressForm.controls;
    component.showTitleCode = true;
    component.user = mockUser;

    spyOn(component.submitAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
    spyOn(fSAddressService, 'getCountries').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and prepopulate customer data', () => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(
      of(mockCountries)
    );
    spyOn(userAddressService, 'loadDeliveryCountries').and.stub();
    spyOn(userAddressService, 'getRegions').and.callThrough();
    spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));
    component.ngOnInit();

    expect(component.addressForm.get('firstName').value).toEqual(
      mockUser.firstName
    );
    expect(component.addressForm.get('lastName').value).toEqual(
      mockUser.lastName
    );

    component.countries$
      .subscribe(countries => {
        expect(countries.length).toEqual(1);
        expect(countries[0].isocode).toEqual(country.key);
      })
      .unsubscribe();
  });

  it('should call ngOnInit without setting initial values for first & last name', () => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userAddressService, 'loadDeliveryCountries').and.stub();
    spyOn(userAddressService, 'getRegions').and.callThrough();
    spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));
    component.user = null;
    component.ngOnInit();

    expect(component.addressForm.get('firstName').value).not.toEqual(
      mockUser.firstName
    );
    expect(component.addressForm.get('lastName').value).not.toEqual(
      mockUser.lastName
    );
  });

  it('should call verifyAddress() when address has some changes', () => {
    spyOn(component, 'verifyAddress').and.callThrough();
    component.ngOnInit();
    component.addressForm.setValue(mockAddress);
    component.addressForm.markAsDirty();
    component.verifyAddress();
    expect(
      component.addressForm['controls'].region['controls'].isocode.value
    ).toEqual(mockAddress.region.isocode);
    expect(component.verifyAddress).toHaveBeenCalled();
  });

  it('should not call verifyAddress() when address does not have change', () => {
    component.ngOnInit();
    component.addressForm.setValue(mockAddress);
    component.addressForm.get('firstName').setValue('firstName');
    component.addressForm.get('lastName').setValue('lastName');
    component.verifyAddress();
    expect(component.addressForm.get('firstName').value).toEqual(null);
    expect(component.addressForm.get('lastName').value).toEqual(null);
  });
});
