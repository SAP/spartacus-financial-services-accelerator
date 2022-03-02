import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';
import { SellerDashboardListComponent } from './seller-dashboard-list.component';
import createSpy = jasmine.createSpy;

const code1 = '000001';
const date1 = 'date1';
const consentHolderName1 = 'chName1';
const consentHolderUid1 = 'chUid1';
const consentTemplateId1 = 'ctId1';
const consentTemplateDesc1 = 'ctDesc1';
const consentTemplateVersion1 = 'ctVersion1';
const customerName1 = 'customerName1';
const customerUid1 = 'customerUid1';

const code2 = '000002';
const date2 = 'date2';
const consentHolderName2 = 'chName2';
const consentHolderUid2 = 'chUid2';
const consentTemplateId2 = 'ctId2';
const consentTemplateDesc2 = 'ctDesc2';
const consentTemplateVersion2 = 'ctVersion2';
const customerName2 = 'customerName2';
const customerUid2 = 'customerUid2';

const consent1 = {
  code: code1,
  consentGivenDate: date1,
  consentHolders: [
    {
      name: consentHolderName1,
      uid: consentHolderUid1,
    },
  ],
  consentTemplate: {
    id: consentTemplateId1,
    description: consentTemplateDesc1,
    version: consentTemplateVersion1,
  },
  customer: {
    name: customerName1,
    uid: customerUid1,
  },
  oboPermissionConfiguration: {
    permissions: [
      {
        key: 'fnol',
        value: true,
      },
      {
        key: 'checkout',
        value: true,
      },
      {
        key: 'documents',
        value: true,
      },
    ],
  },
  pagination: {
    page: 0,
    count: 10,
    totalPages: 2,
    totalCount: 12,
  },
};

const consent2 = {
  code: code2,
  consentGivenDate: date2,
  consentHolders: [
    {
      name: consentHolderName2,
      uid: consentHolderUid2,
    },
  ],
  consentTemplate: {
    id: consentTemplateId2,
    description: consentTemplateDesc2,
    version: consentTemplateVersion2,
  },
  customer: {
    name: customerName2,
    uid: customerUid2,
  },
  oboPermissionConfiguration: {
    permissions: [
      {
        key: 'fnol',
        value: true,
      },
      {
        key: 'checkout',
        value: true,
      },
      {
        key: 'documents',
        value: true,
      },
    ],
  },
  pagination: {
    page: 0,
    count: 10,
    totalPages: 2,
    totalCount: 12,
  },
};

class MockRoutingService {
  go = createSpy();
}

@Component({
  // eslint-disable-next-line
  template: '',
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}

@Component({
  // eslint-disable-next-line
  template: '',
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions;
  @Input() sortLabels;
  @Input() selectedOption;
  @Input() placeholder;
  @Output() sortListEvent = new EventEmitter<string>();
}

const consentList = [consent1, consent2];

class MockConsentConnector {
  getOBOCustomerList() {
    return of(consentList);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockTranslationService {
  translate(key: string): Observable<string> {
    switch (key) {
      case 'dashboard.sorting.name':
        return of('Name');
      case 'fscommon.status':
        return of('Status');
      case 'dashboard.sorting.email':
        return of('Email');
      default:
        return of(key);
    }
  }
}

describe('SellerDashboardListComponent', () => {
  let component: SellerDashboardListComponent;
  let mockConsentConnector: MockConsentConnector;
  let mockUserIdService: UserIdService;
  let mockTranslationService: TranslationService;
  let routingService: RoutingService;
  let fixture: ComponentFixture<SellerDashboardListComponent>;

  beforeEach(async () => {
    mockConsentConnector = new MockConsentConnector();
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        SellerDashboardListComponent,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        { provide: ConsentConnector, useValue: mockConsentConnector },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockUserIdService = TestBed.inject(UserIdService);
    mockTranslationService = TestBed.inject(TranslationService);
    routingService = TestBed.inject(RoutingService);
    spyOn(mockUserIdService, 'getUserId').and.callThrough();
    fixture = TestBed.createComponent(SellerDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to user profile page', () => {
    component.getUserProfile(consent1.customer);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'userProfile',
      params: { customerId: consent1.customer.uid },
    });
  });

  it('should translate sort labels', () => {
    spyOn(mockTranslationService, 'translate').and.callThrough();
    component
      .getSortLabels()
      .subscribe(() =>
        expect(mockTranslationService.translate).toHaveBeenCalledTimes(3)
      )
      .unsubscribe();
  });

  it('should change page', () => {
    spyOn(mockConsentConnector, 'getOBOCustomerList').and.callThrough();
    component.pageChange(1);
    expect(mockConsentConnector.getOBOCustomerList).toHaveBeenCalled();
  });
});
