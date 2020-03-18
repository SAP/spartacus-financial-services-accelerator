import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeCoverageComponent } from './change-coverage.component';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Type } from '@angular/core';
import createSpy = jasmine.createSpy;

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
  getChangeRequest() {
    return of(mockChangeRequest);
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

describe('ChangeCoverageComponent', () => {
  let component: ChangeCoverageComponent;
  let fixture: ComponentFixture<ChangeCoverageComponent>;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;
  let mockChangeRequestService: MockChangeRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
        {
          provide: UserRequestNavigationService,
          useClass: MockUserRequestNavigationService,
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
      declarations: [ChangeCoverageComponent],
    }).compileComponents();

    mockUserRequestNavigationService = TestBed.get(
      UserRequestNavigationService as Type<UserRequestNavigationService>
    );
    mockChangeRequestService = TestBed.get(ChangeRequestService as Type<
      ChangeRequestService
    >);
  }));

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

  it('should add coverage', () => {
    const coverage = {
      coverageProduct: {
        code: product3,
      },
    };

    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of(mockChangeRequest)
    );

    component.ngOnInit();
    component.addCoverage(coverage);
    expect(component.potentialCoverages[0].coverageIsIncluded).toEqual(true);
  });

  it('should remove coverage', () => {
    const coverage = {
      coverageProduct: {
        code: product3,
      },
    };

    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of(mockChangeRequest)
    );

    component.ngOnInit();
    component.removeCoverage(coverage);
    expect(component.potentialCoverages[0].coverageIsIncluded).toEqual(false);
  });
});
