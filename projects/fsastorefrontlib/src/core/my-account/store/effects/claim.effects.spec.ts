import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  GlobalMessageService,
  OCC_USER_ID_CURRENT,
  RoutingService,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromUserRequestActions from '../../../user-request/store/actions';
import { ClaimConnector } from '../../connectors/claim.connector';
import { ClaimDataService } from '../../services/claim-data.service';
import * as fromActions from '../actions';
import * as fromReducer from './../../store/reducers/index';
import * as fromEffects from './claim.effect';

const claimId1 = 'testClaim001';
const claimId2 = 'testClaim002';
const claimId3 = 'testClaim003';
const requestId1 = 'testRequest001';
const requestId2 = 'testRequest002';
const requestId3 = 'testRequest003';
const policyId1 = 'testInsurancePolicy001';

const claim1 = {
  claimNumber: claimId1,
  claimStatus: 'OPEN',
  requestId: requestId1,
};
const claim2 = {
  claimNumber: claimId2,
  claimStatus: 'PROCESSING',
  requestId: requestId2,
};
const claim3 = {
  claimNumber: claimId3,
  claimStatus: 'OPEN',
  requestId: requestId3,
  locationOfLoss: {
    code: 'testCode',
  },
};
const claimList = [claim1, claim2, claim3];

class MockClaimConnector {
  getClaims() {
    return of(claimList);
  }
  deleteClaim() {
    return of({});
  }
  submitClaim() {
    return of(claim1);
  }
  createClaim() {
    return of(claim3);
  }
  updateClaim() {
    return of(claim3);
  }
  getClaim() {
    return of(claim1);
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
  remove = jasmine.createSpy();
}

class MockClaimDataService {
  claimData = claim1;
  userID = OCC_USER_ID_CURRENT;
  claims = {
    claims: claimList,
  };
}
describe('Claim Effects', () => {
  let actions$: Observable<fromActions.ClaimAction>;
  let effects: fromEffects.ClaimEffects;
  let mockClaimConnector: MockClaimConnector;
  let mockClaimDataService: MockClaimDataService;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;

  beforeEach(() => {
    mockClaimConnector = new MockClaimConnector();
    mockClaimDataService = new MockClaimDataService();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromReducer.getReducers()),
      ],
      providers: [
        { provide: ClaimConnector, useValue: mockClaimConnector },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: ClaimDataService,
          useValue: mockClaimDataService,
        },
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
        fromEffects.ClaimEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.ClaimEffects);
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);
  });

  describe('loadClaims$', () => {
    it('should return claims', () => {
      const action = new fromActions.LoadClaims({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadClaimsSuccess(claimList);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadClaims$).toBeObservable(expected);
    });

    it('should fail to return claims', () => {
      spyOn(mockClaimConnector, 'getClaims').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadClaims({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadClaimsFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadClaims$).toBeObservable(expected);
    });
  });

  it('should return claim', () => {
    const action = new fromActions.LoadClaimById({
      userId: OCC_USER_ID_CURRENT,
      claimId: claimId1,
    });
    const completion = new fromActions.LoadClaimByIdSuccess(claim1);
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.loadClaimById$).toBeObservable(expected);
  });

  it('should fail to return claim', () => {
    spyOn(mockClaimConnector, 'getClaim').and.returnValue(throwError('Error'));
    const action = new fromActions.LoadClaimById({
      userId: OCC_USER_ID_CURRENT,
      claimId: claimId1,
    });
    const completion = new fromActions.LoadClaimByIdFail(
      JSON.stringify('Error')
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.loadClaimById$).toBeObservable(expected);
  });

  describe('removeClaim$', () => {
    it('should remove claim', () => {
      const action = new fromActions.DeleteClaim({
        userId: OCC_USER_ID_CURRENT,
        claimId: claimId2,
      });
      const completion = new fromActions.DeleteClaimSuccess();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.removeClaim$).toBeObservable(expected);
    });

    it('should fail to remove claim', () => {
      spyOn(mockClaimConnector, 'deleteClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.DeleteClaim({
        userId: OCC_USER_ID_CURRENT,
        claimId: claimId1,
      });
      const completion = new fromActions.DeleteClaimFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.removeClaim$).toBeObservable(expected);
    });
  });

  describe('createClaim$', () => {
    it('should create claim', () => {
      const action = new fromActions.CreateClaim({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestId3,
        claimData: policyId1,
      });
      const loadUserRequestCompletion =
        new fromUserRequestActions.LoadUserRequestSuccess({
          userId: OCC_USER_ID_CURRENT,
          requestId: requestId3,
        });
      const createClaimCompletion = new fromActions.CreateClaimSuccess(claim3);
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUserRequestCompletion,
        c: createClaimCompletion,
      });

      expect(effects.createClaim$).toBeObservable(expected);
    });

    it('should fail to create claim', () => {
      spyOn(mockClaimConnector, 'createClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.CreateClaim({
        userId: OCC_USER_ID_CURRENT,
        policyId: policyId1,
        contractId: policyId1,
      });
      const completion = new fromActions.CreateClaimFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.createClaim$).toBeObservable(expected);
    });
  });

  describe('updateClaim$', () => {
    it('should update claim', () => {
      const action = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        claimData: {
          requestId: requestId3,
          policeInformed: 'yes',
          witnesses: 'yes',
        },
        stepData: {
          stepContent: {
            contentData: 'formContent',
          },
        },
      });

      const updateClaimSuccess = new fromActions.UpdateClaimSuccess(claim3);
      const updateRequestSuccess = new fromUserRequestActions.UpdateUserRequest(
        {
          userId: OCC_USER_ID_CURRENT,
          requestId: requestId3,
          stepData: {
            stepContent: {
              contentData: 'formContent',
            },
          },
        }
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: updateClaimSuccess,
        c: updateRequestSuccess,
      });
      expect(effects.updateClaim$).toBeObservable(expected);
    });

    it('should update claim with location of loss', () => {
      mockClaimDataService.claimData = claim3;
      const action = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        claimData: {
          requestId: requestId3,
          policeInformed: 'yes',
          witnesses: 'yes',
        },
        stepData: {
          stepContent: {
            contentData: 'formContent',
          },
        },
      });
      const updateClaimSuccess = new fromActions.UpdateClaimSuccess(claim3);
      const updateRequestSuccess = new fromUserRequestActions.UpdateUserRequest(
        {
          userId: OCC_USER_ID_CURRENT,
          requestId: requestId3,
          stepData: {
            stepContent: {
              contentData: 'formContent',
            },
          },
        }
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: updateClaimSuccess,
        c: updateRequestSuccess,
      });
      expect(effects.updateClaim$).toBeObservable(expected);
    });

    it('should update claim without holding claim data in data service', () => {
      mockClaimDataService.claimData = {
        claimNumber: undefined,
        requestId: undefined,
        claimStatus: undefined,
      };
      const action = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        claimData: {
          requestId: 'testRequest003',
          policeInformed: 'yes',
          witnesses: 'yes',
        },
        stepData: {
          stepContent: {
            contentData: 'formContent',
          },
        },
      });
      const updateClaimSuccess = new fromActions.UpdateClaimSuccess(claim3);
      const updateRequestSuccess = new fromUserRequestActions.UpdateUserRequest(
        {
          userId: OCC_USER_ID_CURRENT,
          requestId: requestId3,
          stepData: {
            stepContent: {
              contentData: 'formContent',
            },
          },
        }
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: updateClaimSuccess,
        c: updateRequestSuccess,
      });
      expect(effects.updateClaim$).toBeObservable(expected);
    });

    it('should fail to update claim', () => {
      spyOn(mockClaimConnector, 'updateClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestId3,
        claimData: {
          policeInformed: 'invalidData',
        },
        stepData: {
          stepContent: {
            contentData: 'formContent',
          },
        },
      });
      const completion = new fromActions.UpdateClaimFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateClaim$).toBeObservable(expected);
    });
  });

  describe('changeClaim$', () => {
    it('should change claim', () => {
      const action = new fromActions.ChangeClaim({
        userId: OCC_USER_ID_CURRENT,
        claimData: claim3,
      });
      const changeClaimCompletion = new fromActions.UpdateClaimSuccess(claim3);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: changeClaimCompletion });

      expect(effects.changeClaim$).toBeObservable(expected);
    });

    it('should fail to change claim', () => {
      spyOn(mockClaimConnector, 'updateClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.ChangeClaim({
        userId: OCC_USER_ID_CURRENT,
        claimData: {
          claimNumber: 'invalidClaimNumber',
        },
      });
      const completion = new fromActions.UpdateClaimFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.changeClaim$).toBeObservable(expected);
    });
  });
});
