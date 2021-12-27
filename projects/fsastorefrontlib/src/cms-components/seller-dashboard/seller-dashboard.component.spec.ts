import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';

import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';
import { SellerDashboardComponent } from './seller-dashboard.component';
import {
  FSUser,
  FSUserRole,
  OBOCustomerList,
} from '../../occ/occ-models/occ.models';
import { Component, Pipe, PipeTransform } from '@angular/core';

const mockSeller: FSUser = {
  firstName: 'Donna',
  lastName: 'Moore',
  roles: [FSUserRole.SELLER],
};

const mockOBOCustomer: OBOCustomerList = {
  entries: [
    {
      name: 'Zika Muzika',
      uid: 'zika@muzika.com',
      active: true,

      currency: {
        active: true,
        isocode: 'EUR',
        name: 'Euro',
        symbol: '€',
      },
      customerId: '0d99fc5e-b519-4862-92ee-1306279952ad',
      defaultAddress: { id: '8796125822999' },
      displayUid: 'zika@muzika.com',
      firstName: 'Zika',
      lastName: 'Muzika',

      roles: ['b2bcustomergroup', 'AirlineMen'],

      title: 'Mr.',
      titleCode: 'mr',
    },
  ],
  pagination: {},
  sorts: [],
};

class MockConsentConnector {
  getOBOCustomerList(OCC_USER_ID_CURRENT) {
    return of(mockOBOCustomer);
  }
}

class MockUserAccountFacade {
  get() {
    return of(mockSeller);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

@Pipe({
  name: 'parseDate',
})
class MockParseDatePipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-fs-seller-dashboard-list',
})
class SellerDashboardListComponent {}

describe('SellerDashboardComponent', () => {
  let component: SellerDashboardComponent;
  let fixture: ComponentFixture<SellerDashboardComponent>;
  let mockConsentConnector: MockConsentConnector;
  let mockUserIdService: UserIdService;
  let userAccountFacade: MockUserAccountFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        SellerDashboardComponent,
        SellerDashboardListComponent,
        MockParseDatePipe,
      ],
      providers: [
        { provide: ConsentConnector, useClass: MockConsentConnector },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockUserIdService = TestBed.inject(UserIdService);
    userAccountFacade = TestBed.inject(UserAccountFacade);
    mockConsentConnector = TestBed.inject(ConsentConnector);
    fixture = TestBed.createComponent(SellerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Dashboard list', () => {
    component.showDashboardList();
    expect(component.dashboardListVisible).toEqual(true);
  });
});
