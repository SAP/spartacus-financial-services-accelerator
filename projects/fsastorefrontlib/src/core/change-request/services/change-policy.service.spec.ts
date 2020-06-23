import { TestBed } from '@angular/core/testing';
import { RequestType } from './../../../occ/occ-models/occ.models';
import { ChangePolicyService } from './change-policy.service';

describe('ChangePolicyService', () => {
  let service: ChangePolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePolicyService],
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
});
