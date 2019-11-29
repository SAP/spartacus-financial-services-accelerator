import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRequestNavigationComponent } from './user-request-navigation.component';
import { I18nTestingModule } from '@spartacus/core';
import { FSUserRequest } from '../../../occ/occ-models';
import { of } from 'rxjs';
import { UserRequestService } from '../../../core/user-request/services/user-request/user-request.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRequestNavigationService } from '../../../core/user-request/services/user-request/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';
import {
  ClaimDataService,
  ClaimService,
} from '../../../core/my-account/services';
import { FormDataService } from '@fsa/dynamicforms';
import { UserRequestDataService } from '../../../core/user-request/services';

const mockRequest: FSUserRequest = {
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
  getUserRequest() {
    return of(mockRequest);
  }
}

export class MockUserRequestNavigationService {
  getActiveStep() {
    return mockRequest.configurationSteps[0];
  }
}

describe('UserRequestNavigationComponent', () => {
  let component: UserRequestNavigationComponent;
  let fixture: ComponentFixture<UserRequestNavigationComponent>;
  let mockUserRequestService: MockUserRequestService;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;

  beforeEach(async(() => {
    mockUserRequestService = new MockUserRequestService();
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [UserRequestNavigationComponent],
      providers: [
        {
          provide: UserRequestService,
          useValue: mockUserRequestService,
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
          provide: ClaimService,
          useValue: ClaimService,
        },
        {
          provide: ClaimDataService,
          useValue: ClaimDataService,
        },
        {
          provide: UserRequestDataService,
          useValue: UserRequestDataService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
