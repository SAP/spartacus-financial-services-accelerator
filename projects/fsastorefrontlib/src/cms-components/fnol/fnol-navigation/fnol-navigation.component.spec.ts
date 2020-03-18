import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormDataService } from '@fsa/dynamicforms';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { UserRequestService } from '../../../core/user-request/facade/user-request.service';
import { Claim } from '../../../occ/occ-models';
import { ClaimService } from './../../../core/my-account/facade/claim.service';
import { FNOLNavigationComponent } from './fnol-navigation.component';

const claimRequest: Claim = {
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
