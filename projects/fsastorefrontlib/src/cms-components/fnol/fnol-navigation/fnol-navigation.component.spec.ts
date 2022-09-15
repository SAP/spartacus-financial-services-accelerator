import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FileService,
  FormDataService,
  YFormData,
} from '@spartacus/dynamicforms';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { UserRequestService } from '../../../core/user-request/facade/user-request.service';
import { ClaimService } from './../../../core/my-account/facade/claim.service';
import { FNOLNavigationComponent } from './fnol-navigation.component';
import createSpy = jasmine.createSpy;

const claimRequest = {
  requestId: 'test123',
  configurationSteps: [
    {
      name: 'step1',
      pageLabelOrId: 'page1',
      sequenceNumber: '1',
      yformConfigurator: {
        id: '12345',
      },
      stepContent: {
        contentData: {
          entry: [
            { key: 'whatHappened', value: 'AutoFire' },
            { key: 'whenHappened', value: '2021-02-05' },
          ],
        },
      },
    },
    {
      name: 'step2',
      pageLabelOrId: 'page2',
      sequenceNumber: '2',
      status: 'COMPLETED',
      yformConfigurator: {
        id: '12346',
      },
      stepContent: {
        contentData: {
          entry: [
            { key: 'howAccidentOccurred', value: 'testValue' },
            { key: 'relevantFiles', value: '[DOC00001000]' },
          ],
        },
      },
    },
  ],
};
const mockActivatedRoute = {
  routeConfig: {
    path: {},
  },
};
const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};
const configurationSteps = claimRequest.configurationSteps;
const activeStepIndex = 1;
const stepStatus = 'COMPLETED';
const userRequest = {
  configurationSteps: configurationSteps,
  requestStatus: stepStatus,
  fsStepGroupDefinition: {
    confirmationUrl: 'fnolConfirmationPage',
  },
};

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
blob1['code'] = 'DOC00002012';
const mockFile = <File>blob1;
const uploadedContent = {
  content: {
    files: [mockFile],
  },
};

export class MockUserRequestService {
  getAction() {
    return of('');
  }
  getUserRequest() {
    return of(userRequest);
  }
}

export class MockClaimService {
  getCurrentClaim() {
    return of(claimRequest);
  }
  updateClaim() {
    return of();
  }
}

export class MockUserRequestNavigationService {
  getActiveStep() {
    return claimRequest.configurationSteps[0];
  }
  continue(configSteps, currentStep) {}
  back(configSteps, currentStep) {}
}

export class MockFileService {
  getUploadedDocuments() {
    return of(uploadedContent);
  }
  resetFiles() {}
}

export class MockFormDataService {
  getSubmittedForm() {
    return of(formData);
  }
  submit() {}
}

class MockRoutingService {
  go = createSpy();
}

describe('FNOLNavigationComponent', () => {
  let component: FNOLNavigationComponent;
  let fixture: ComponentFixture<FNOLNavigationComponent>;
  let mockUserRequestService: MockUserRequestService;
  let mockClaimService: MockClaimService;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;
  let mockFileService: MockFileService;
  let mockFormDataService: FormDataService;
  let mockRoutingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      mockUserRequestService = new MockUserRequestService();
      mockClaimService = new MockClaimService();
      mockUserRequestNavigationService = new MockUserRequestNavigationService();
      mockFileService = new MockFileService();
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
            useClass: MockFormDataService,
          },
          {
            provide: FileService,
            useValue: mockFileService,
          },
          {
            provide: GlobalMessageService,
            useValue: GlobalMessageService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FNOLNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockFormDataService = TestBed.inject(FormDataService);
    mockRoutingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the next claim step', () => {
    spyOn(mockUserRequestNavigationService, 'continue').and.callThrough();
    component.next(activeStepIndex, claimRequest);
    expect(mockUserRequestNavigationService.continue).toHaveBeenCalledWith(
      configurationSteps,
      activeStepIndex
    );
  });

  it('should redirect to the claim confirmation page', () => {
    userRequest.requestStatus = 'SUBMITTED';
    spyOn(mockUserRequestService, 'getUserRequest').and.returnValue(
      of(userRequest)
    );
    component.next(activeStepIndex, claimRequest);
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should redirect to the back claim step', () => {
    spyOn(mockUserRequestNavigationService, 'back').and.callThrough();
    component.back(activeStepIndex);
    expect(mockUserRequestNavigationService.back).toHaveBeenCalledWith(
      configurationSteps,
      activeStepIndex
    );
  });
});
