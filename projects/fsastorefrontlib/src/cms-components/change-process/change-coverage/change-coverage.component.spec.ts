import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangePolicyService } from './../../../core/change-request/services/change-policy.service';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ChangeCoverageComponent } from './change-coverage.component';
import createSpy = jasmine.createSpy;

@Component({
  // eslint-disable-next-line
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

const requestId = 'testRequestId';
const policyId = 'testPolicy';

const product1 = 'product1';
const product2 = 'product2';
const product3 = 'product3';
const product4 = 'product4';

const mockChangeRequest = {
  requestId: requestId,
  insurancePolicy: {
    policyNumber: policyId,
    categoryCode: {
      code: 'testCategory',
    },
    optionalProducts: [
      {
        coverageProduct: {
          code: product1,
        },
        coverageIsIncluded: true,
      },
      {
        coverageProduct: {
          code: product2,
        },
        coverageIsIncluded: true,
      },
      {
        coverageProduct: {
          code: product3,
        },
        coverageIsIncluded: false,
      },
      {
        coverageProduct: {
          code: product4,
        },
        coverageIsIncluded: false,
      },
    ],
  },
  changedPolicy: {},
};
class MockChangeRequestService {
  simulateChangeRequest = createSpy();

  getChangeRequestError() {
    return of();
  }
  getChangeRequest() {
    return of(mockChangeRequest);
  }
  getAction() {
    return of({
      requestStatus: 'OPEN',
      fsStepGroupDefinition: 'test',
    });
  }
}

const configurationSteps = [
  {
    code: 'step1',
  },
];

class MockUserRequestNavigationService {
  continue = createSpy();

  getConfigurationSteps() {
    return configurationSteps;
  }
  getActiveStep() {}
}

class MockRoutingService {
  go = createSpy();
}

@Pipe({
  name: 'cxFormatDate',
})
class MockDatePipe implements PipeTransform {
  transform() {}
}

class GlobalMessageServiceMock {}

class MockChangePolicyService {}

describe('ChangeCoverageComponent', () => {
  let component: ChangeCoverageComponent;
  let fixture: ComponentFixture<ChangeCoverageComponent>;
  let mockUserRequestNavigationService: UserRequestNavigationService;
  let mockChangeRequestService: ChangeRequestService;
  let mockRoutingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgbTooltipModule, I18nTestingModule, ReactiveFormsModule],
        providers: [
          { provide: ChangeRequestService, useClass: MockChangeRequestService },
          {
            provide: UserRequestNavigationService,
            useClass: MockUserRequestNavigationService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: GlobalMessageService,
            useClass: GlobalMessageServiceMock,
          },
          {
            provide: ChangePolicyService,
            useClass: MockChangePolicyService,
          },
          {
            provide: ActivatedRoute,
            useValue: {
              routeConfig: {
                path: 'testPath',
              },
            },
          },
        ],
        declarations: [
          ChangeCoverageComponent,
          MockMediaComponent,
          MockDatePipe,
        ],
      }).compileComponents();

      mockUserRequestNavigationService = TestBed.inject(
        UserRequestNavigationService
      );
      mockRoutingService = TestBed.inject(RoutingService);
      globalMessageService = TestBed.inject(GlobalMessageService);
      mockChangeRequestService = TestBed.inject(ChangeRequestService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate if policy is simulated', () => {
    const simulatedRequest = mockChangeRequest;
    simulatedRequest.changedPolicy = {
      policyNumber: policyId,
    };
    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of(simulatedRequest)
    );
    component.ngOnInit();
    expect(mockUserRequestNavigationService.continue).toHaveBeenCalled();
  });

  it('should add coverage and execute simulation', () => {
    component.optionalCoverages =
      mockChangeRequest.insurancePolicy.optionalProducts;
    const coverage = {
      coverageProduct: {
        code: product1,
      },
    };

    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of(mockChangeRequest)
    );
    component.addCoverage(coverage);
    component.simulateChanges(mockChangeRequest);
    expect(component.optionalCoverages[0].coverageIsIncluded).toEqual(true);
  });

  it('should remove coverage', () => {
    component.optionalCoverages =
      mockChangeRequest.insurancePolicy.optionalProducts;
    const coverage = {
      coverageProduct: {
        code: product1,
      },
    };

    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of(mockChangeRequest)
    );

    component.removeCoverage(coverage);
    expect(component.optionalCoverages[0].coverageIsIncluded).toEqual(false);
  });

  it('should not execute simulation if nothing is changed', () => {
    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of(mockChangeRequest)
    );

    component.ngOnInit();
    component.simulateChanges(mockChangeRequest);
    expect(
      mockChangeRequestService.simulateChangeRequest
    ).not.toHaveBeenCalled();
  });
});
