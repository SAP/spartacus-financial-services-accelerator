import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FNOLNavigationComponent } from './fnol-navigation.component';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { FSUserRequest } from '../../../occ/occ-models';
import { of } from 'rxjs';
import { UserRequestService } from '../../../core/user-request/facade/user-request.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { ClaimService } from './../../../core/my-account/facade/claim.service';

const claimRequest: FSUserRequest = {
  requestId: 'test123',
  configurationSteps: [
    {
      name: 'step1',
      pageLabelOrId: 'page1',
      sequenceNumber: '1',
    },
    {
      name: 'step2',
      pageLabelOrId: 'page2',
      sequenceNumber: '2',
    },
  ],
};

const mockActivatedRoute = {
  routeConfig: {
    path: {},
  },
};

export class MockUserRequestService {
  d;
  getAction() {
    return of('');
  }
}

export class MockClaimService {
  getCurrentClaim() {
    return of(claimRequest);
  }
}

export class MockUserRequestNavigationService {
  getActiveStep() {
    return claimRequest.configurationSteps[0];
  }
}

describe('FNOLNavigationComponent', () => {
  let component: FNOLNavigationComponent;
  let fixture: ComponentFixture<FNOLNavigationComponent>;
  let mockUserRequestService: MockUserRequestService;
  let mockClaimService: MockClaimService;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;

  beforeEach(async(() => {
    mockUserRequestService = new MockUserRequestService();
    mockClaimService = new MockClaimService();
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [FNOLNavigationComponent],
      providers: [
        {
          provide: UserRequestService,
          useValue: mockUserRequestService,
        },
        {
          provide: ClaimService,
          useValue: mockClaimService,
        },
        {
          provide: UserRequestNavigationService,
          useValue: mockUserRequestNavigationService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: FormDataService,
          useValue: FormDataService,
        },
        {
          provide: GlobalMessageService,
          useValue: GlobalMessageService,
        },
        {
          provide: RoutingService,
          useValue: RoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FNOLNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
