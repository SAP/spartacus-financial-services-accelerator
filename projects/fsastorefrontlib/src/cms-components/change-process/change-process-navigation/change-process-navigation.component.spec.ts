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
};

class MockRoutingService {
  go = createSpy();
}

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
  cancelChangeRequest() {
    return of(mockChangeRequest);
  }
}

describe('ChangeProcessNavigationComponent', () => {
  let component: ChangeProcessNavigationComponent;
  let fixture: ComponentFixture<ChangeProcessNavigationComponent>;
  let mockRoutingService: MockRoutingService;
  let globalMessageService: GlobalMessageService;
  let mockChangeRequestService: MockChangeRequestService;

  beforeEach(async(() => {
    mockRoutingService = new MockRoutingService();
    mockChangeRequestService = new MockChangeRequestService();
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
});
