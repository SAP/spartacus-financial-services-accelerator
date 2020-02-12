import { TestBed, inject } from '@angular/core/testing';
import { Type } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { FSStepData } from '../../../occ/occ-models/occ.models';
import { UserRequestNavigationService } from './user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';
import createSpy = jasmine.createSpy;

const page2 = 'page2';
const step2 = 'step2';
const nonExistingPage = 'page23';
class MockActivatedRoute {}

class MockRoutingService {
  go = createSpy();
}

const configurationSteps: FSStepData[] = [
  {
    sequenceNumber: '0',
    name: 'step',
    pageLabelOrId: 'page1',
  },
  {
    sequenceNumber: '1',
    name: step2,
    pageLabelOrId: page2,
  },
  {
    sequenceNumber: '2',
    name: 'step3',
    pageLabelOrId: 'page3',
  },
];
describe('UserRequestNavigationServiceTest', () => {
  let service: UserRequestNavigationService;
  let mockRoutingService: MockRoutingService;
  let mockActivatedRoute: MockActivatedRoute;
  beforeEach(() => {
    mockRoutingService = new MockRoutingService();
    mockActivatedRoute = new MockActivatedRoute();
    TestBed.configureTestingModule({
      providers: [
        UserRequestNavigationService,
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    service = TestBed.get(UserRequestNavigationService as Type<
      UserRequestNavigationService
    >);
  });

  it('should inject User navigation request service', inject(
    [UserRequestNavigationService],
    (userRequestNavigationService: UserRequestNavigationService) => {
      expect(userRequestNavigationService).toBeTruthy();
    }
  ));

  it('should be able to return active step', () => {
    const activeStep = service.getActiveStep(configurationSteps, page2);
    expect(activeStep.name).toEqual(step2);
  });

  it('should not be able to return active step', () => {
    const activeStep = service.getActiveStep(
      configurationSteps,
      nonExistingPage
    );
    expect(activeStep).toBe(undefined);
  });

  it('should not able to return active step without configurationSteps', () => {
    const activeStep = service.getActiveStep(undefined, page2);
    expect(activeStep).toBe(undefined);
  });
  it('should be able to route to the next step', () => {
    service.continue(configurationSteps, 0);
    expect(mockRoutingService.go).toHaveBeenCalledWith({ cxRoute: page2 });
  });
  it('should not able to route to the next step', () => {
    service.continue(undefined, 0);
    expect(mockRoutingService.go).not.toHaveBeenCalledWith({ cxRoute: page2 });
  });

  it('should not be able to route back to the previous step', () => {
    service.back(undefined, 0);
    expect(mockRoutingService.go).not.toHaveBeenCalledWith({ cxRoute: page2 });
  });

  it('should be able to route back to the previous step', () => {
    service.back(configurationSteps, 2);
    expect(mockRoutingService.go).toHaveBeenCalledWith({ cxRoute: page2 });
  });
});
