import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeProcessNavigationComponent } from './change-process-navigation.component';
import createSpy = jasmine.createSpy;
import { ActivatedRoute } from '@angular/router';
import { FSUserRequest, FSStepData } from '../../../occ/occ-models/occ.models';
import { UserRequestNavigationService } from '../../../core/user-request/facade';

const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    contractNumber: 'testPolicy',
    categoryCode: {
      code: 'testCategory',
    },
  },
  requestStatus: 'CANCELED',
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

class MockRoutingService {
  go = createSpy();
}

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

const mockActivatedRoute = {
  routeConfig: {
    path: {},
  },
};
class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
  cancelChangeRequest() {
    return of(mockChangeRequest);
  }
}
export class MockUserRequestNavigationService {
  continue(configurationSteps: FSStepData[], step: number) {}
  getActiveStep() {
    return mockChangeRequest.configurationSteps[0];
  }
  getConfigurationSteps() {
    return mockChangeRequest.configurationSteps;
  }
}

describe('ChangeProcessNavigationComponent', () => {
  let component: ChangeProcessNavigationComponent;
  let fixture: ComponentFixture<ChangeProcessNavigationComponent>;
  let mockRoutingService: MockRoutingService;
  let globalMessageService: GlobalMessageService;
  let mockChangeRequestService: MockChangeRequestService;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;

  beforeEach(async(() => {
    mockRoutingService = new MockRoutingService();
    mockChangeRequestService = new MockChangeRequestService();
    mockUserRequestNavigationService = new MockUserRequestNavigationService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ChangeRequestService, useValue: mockChangeRequestService },
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageServiceMock,
        },
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
    mockChangeRequestService = TestBed.get(ChangeRequestService as Type<
      ChangeRequestService
    >);
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    globalMessageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel change request', () => {
    spyOn(globalMessageService, 'add').and.stub();
    const expectedInfoMessage = 'Your policy change request has been canceled';
    component.changeRequest$ = of(mockChangeRequest);
    component.cancelRequest('testRequestId');

    expect(mockRoutingService.go).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      expectedInfoMessage,
      GlobalMessageType.MSG_TYPE_INFO
    );
  });

  it('should navigateNext', () => {
    spyOn(mockUserRequestNavigationService, 'continue');
    component.navigateNext(1);
    expect(mockUserRequestNavigationService.continue).toHaveBeenCalledWith(
      mockChangeRequest.configurationSteps,
      1
    );
  });
});
