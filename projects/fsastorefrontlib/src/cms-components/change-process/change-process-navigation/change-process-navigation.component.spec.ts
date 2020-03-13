import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeProcessNavigationComponent } from './change-process-navigation.component';
import { ActivatedRoute } from '@angular/router';
import { FSUserRequest } from '../../../../../../dist/fsastorefrontlib/occ/occ-models';
import { UserRequestNavigationService } from '../../../core/user-request/facade';

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
const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    categoryCode: {
      code: 'testCategory',
    },
  },
};
const mockActivatedRoute = {
  routeConfig: {
    path: {},
  },
};
class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
}
export class MockUserRequestNavigationService {
  getActiveStep() {
    return mockRequest.configurationSteps[0];
  }
}

describe('ChangeProcessNavigationComponent', () => {
  let component: ChangeProcessNavigationComponent;
  let fixture: ComponentFixture<ChangeProcessNavigationComponent>;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;

  beforeEach(async(() => {
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: UserRequestNavigationService,
          useValue: mockUserRequestNavigationService,
        },
      ],
      declarations: [ChangeProcessNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
