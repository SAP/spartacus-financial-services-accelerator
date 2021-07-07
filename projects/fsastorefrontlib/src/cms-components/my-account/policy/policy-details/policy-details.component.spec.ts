import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileService } from '@spartacus/dynamicforms';

import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import * as FileSaver from 'file-saver';
import { Observable, of } from 'rxjs';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { AccordionModule } from '../../../../shared/accordion/accordion.module';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import {
  AllowedFSRequestType,
  RequestType,
} from './../../../../occ/occ-models';
import { PolicyDetailsComponent } from './policy-details.component';
import { ActivatedRoute } from '@angular/router';

const policyId = 'policyId';
const contractId = 'contractId';
const startDate = '2020-07-30T06:00:04+0000';
const documentId = 'documentId';
const documentMime = 'mockMimeType';

const document = {
  code: documentId,
  mime: documentMime,
};

let mockParams = {
  policyId: '0123456',
  contractId: '0123456',
};

const mockRequest = {
  requestId: 'requestId',
  configurationSteps: [
    {
      pageLabelOrId: 'testStep',
    },
  ],
};

class MockPolicyService {
  loadPolicyDetails() {}
  getPolicyDetails() {}
}

class MockRoutingService {
  go = jasmine.createSpy('Redirect');
}
const mockAllowedFSRequestTypes: AllowedFSRequestType[] = [
  {
    requestType: {
      code: RequestType.FSCLAIM,
    },
  },
  {
    requestType: {
      code: RequestType.COVERAGE_CHANGE,
    },
  },
  {
    requestType: {
      code: RequestType.INSURED_OBJECT_CHANGE,
    },
  },
];

class MockChangeRequestService {
  getChangeRequest(): Observable<any> {
    return of({});
  }
  createChangeRequest(policy, contract, changeRequest) {}
}

const mockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};
const mockEvent = {
  preventDefault() {},
};

class MockFileService {
  getDocument(file) {
    return of(document);
  }
}

class MockFSTranslationService {
  getTranslationValue() {}
}

describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let fixture: ComponentFixture<PolicyDetailsComponent>;
  let changeRequestService: MockChangeRequestService;
  let routingService: RoutingService;
  let policyService: PolicyService;
  let fileService: FileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AccordionModule, I18nTestingModule],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: PolicyService, useClass: MockPolicyService },
          { provide: OccConfig, useValue: mockOccModuleConfig },
          { provide: ChangeRequestService, useClass: MockChangeRequestService },
          { provide: FileService, useClass: MockFileService },
          { provide: FSTranslationService, useClass: MockFSTranslationService },
          { provide: ActivatedRoute, useValue: { params: of(mockParams) } },
        ],
        declarations: [PolicyDetailsComponent],
      }).compileComponents();

      changeRequestService = TestBed.inject(ChangeRequestService);
      routingService = TestBed.inject(RoutingService);
      policyService = TestBed.inject(PolicyService);
      fileService = TestBed.inject(FileService);
    })
  );

  beforeEach(() => {
    spyOn(FileSaver, 'saveAs').and.stub();
    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should check', () => {
    expect(component).toBeTruthy();
  });

  it('should check if policyId and contractId are not provided', () => {
    mockParams = {
      policyId: undefined,
      contractId: undefined,
    };
    spyOn(policyService, 'loadPolicyDetails').and.stub();
    expect(policyService.loadPolicyDetails).not.toHaveBeenCalled();
  });

  it('should return baseUrl', () => {
    expect(component.baseUrl).toEqual('');
  });

  it('should create change request for policy', () => {
    spyOn(changeRequestService, 'createChangeRequest').and.stub();
    spyOn(changeRequestService, 'getChangeRequest').and.returnValue(
      of(mockRequest)
    );
    component.changePolicyDetails(
      policyId,
      contractId,
      RequestType.INSURED_OBJECT_CHANGE
    );
    expect(changeRequestService.createChangeRequest).toHaveBeenCalledWith(
      policyId,
      contractId,
      RequestType.INSURED_OBJECT_CHANGE
    );
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect if change request is not created', () => {
    spyOn(changeRequestService, 'getChangeRequest').and.stub();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should check if request type is allowed', () => {
    expect(
      component.isChangeAllowed(
        mockAllowedFSRequestTypes,
        RequestType.COVERAGE_CHANGE,
        startDate
      )
    ).toEqual(true);
  });

  it('should check if request type is not allowed', () => {
    expect(
      component.isChangeAllowed(
        mockAllowedFSRequestTypes,
        'NOT_EXISTING_TYPE',
        startDate
      )
    ).toEqual(false);
  });

  it('should check if request type is not allowed when allowed request types are not defined', () => {
    expect(
      component.isChangeAllowed(null, 'NOT_EXISTING_TYPE', startDate)
    ).toEqual(false);
  });

  it('should test get document', () => {
    spyOn(fileService, 'getDocument').and.callThrough();
    component.getDocument(document);
    expect(fileService.getDocument).toHaveBeenCalledWith(document);
  });

  it('should check if adding of new insured object is allowed', () => {
    const insuredObject = {
      childInsuredObjectList: {
        insuredObjects: [
          {
            insuredObjectId: '001',
            insuredObjectType: 'TEST_TYPE',
          },
          {
            insuredObjectId: '002',
            insuredObjectType: 'TEST_TYPE',
          },
        ],
      },
    };
    const allowed = component.isAddingOfInsuredObjectAllowed(insuredObject, 3);
    const notAllowed = component.isAddingOfInsuredObjectAllowed(
      insuredObject,
      2
    );

    expect(allowed).toBe(true);
    expect(notAllowed).toBe(false);
  });
});
