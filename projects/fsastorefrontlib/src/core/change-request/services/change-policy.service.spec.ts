import { TestBed } from '@angular/core/testing';
import { RequestType } from './../../../occ/occ-models/occ.models';
import { FSTranslationService } from './../../i18n/facade/translation.service';
import { ChangePolicyService } from './change-policy.service';

const mockChangeProcessForm = {
  dateOfBirth: '1990-05-05',
  lastName: 'Changed lastName',
  driverCategory: 'Occasional',
  driverGender: 'Female',
};

class MockFSTranslationService {
  getTranslationValue() {}
}

describe('ChangePolicyService', () => {
  let service: ChangePolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangePolicyService,
        {
          provide: FSTranslationService,
          useClass: MockFSTranslationService,
        },
      ],
    });

    service = TestBed.inject(ChangePolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get changed policy objects for type change insured object', () => {
    const changeRequestData = {
      fsStepGroupDefinition: {
        requestType: {
          code: RequestType.INSURED_OBJECT_CHANGE,
        },
      },
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [
            {
              insuredObjectItems: [
                {
                  label: 'testLabel',
                  value: '123',
                  changeable: true,
                },
              ],
            },
          ],
        },
      },
      changedPolicy: {
        insuredObjectList: {
          insuredObjects: [
            {
              insuredObjectItems: [
                {
                  label: 'testLabel',
                  value: '321',
                  changeable: true,
                },
              ],
            },
          ],
        },
      },
    };
    service.getChangedPolicyObjects(changeRequestData);
  });

  it('should not get changed policy objects for type change insured object', () => {
    const changeRequestData = {
      fsStepGroupDefinition: {
        requestType: {
          code: RequestType.INSURED_OBJECT_CHANGE,
        },
      },
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [
            {
              insuredObjectItems: [
                {
                  label: 'testLabel',
                  value: '123',
                  changeable: false,
                },
              ],
            },
          ],
        },
      },
    };
    service.getChangedPolicyObjects(changeRequestData);
  });

  it('should get changed policy objects for type change coverage', () => {
    const changeRequestData = {
      fsStepGroupDefinition: {
        requestType: {
          code: RequestType.COVERAGE_CHANGE,
        },
      },
      insurancePolicy: {
        optionalProducts: [
          {
            coverageProduct: {
              cartDisplayName: 'testName',
            },
            coverageIsIncluded: true,
          },
        ],
      },
      changedPolicy: {
        optionalProducts: [
          {
            coverageProduct: {
              cartDisplayName: 'testName',
            },
            coverageIsIncluded: true,
          },
        ],
      },
    };
    service.getChangedPolicyObjects(changeRequestData);
  });

  it('should not get changed policy objects for type change coverage', () => {
    const changeRequestData = {
      fsStepGroupDefinition: {
        requestType: {
          code: RequestType.COVERAGE_CHANGE,
        },
      },
      insurancePolicy: {},
    };
    service.getChangedPolicyObjects(changeRequestData);
  });

  it('should create new insured object based on provided form data', () => {
    const newInsuredObject = service.createInsuredObject(mockChangeProcessForm);

    expect(newInsuredObject.insuredObjectItems.length).toEqual(4);
    expect(newInsuredObject.insuredObjectItems[0].label).toEqual('dateOfBirth');
  });

  it('should get changed insured object based on provided form data', () => {
    const mockChangeRequest = {
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [
            {
              insuredObjectId: 'testInsuredObject',
              insuredObjectItems: [
                {
                  label: 'lastName',
                  value: 'Initial lastName',
                  changeable: true,
                },
                {
                  label: 'firstName',
                  value: 'Initial firstName',
                  changeable: false,
                },
              ],
            },
          ],
        },
      },
    };
    const changedInsuredObject = service.getChangedInsuredObject(
      mockChangeRequest,
      mockChangeProcessForm
    );

    expect(changedInsuredObject.insuredObjectId).toEqual('testInsuredObject');
    expect(changedInsuredObject.insuredObjectItems[0].label).toEqual(
      'lastName'
    );
    expect(changedInsuredObject.insuredObjectItems[0].value).toEqual(
      'Changed lastName'
    );
  });
});
