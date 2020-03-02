import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './claim.effect';
import * as fromReducer from './../../store/reducers/index';
import * as fromUserRequestActions from '../../../user-request/store/actions';
import { ClaimDataService } from '../../services/claim-data.service';
import { ClaimConnector } from '../../connectors/claim.connector';

const claim1 = {
  claimNumber: 'testClaim001',
  claimStatus: 'OPEN',
  requestId: 'testRequest001',
};
const claim2 = {
  claimNumber: 'testClaim002',
  claimStatus: 'PROCESSING',
  requestId: 'testRequest002',
};
const claim3 = {
  claimNumber: 'testClaim003',
  claimStatus: 'OPEN',
  requestId: 'testRequest003',
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
        {
          provide: ClaimDataService,
          useValue: mockClaimDataService,
        },
        fromEffects.ClaimEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.ClaimEffects as Type<
      fromEffects.ClaimEffects
    >);
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

  describe('removeClaim$', () => {
    it('should remove claim', () => {
      const action = new fromActions.DeleteClaim({
        userId: OCC_USER_ID_CURRENT,
        claimId: 'testClaim002',
      });
      const completion = new fromActions.DeleteClaimSuccess();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.removeClaim$).toBeObservable(expected);
    });

    it('should fail to remove claims', () => {
      spyOn(mockClaimConnector, 'deleteClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.DeleteClaim({
        userId: OCC_USER_ID_CURRENT,
        claimId: 'testClaim001',
      });
      const completion = new fromActions.DeleteClaimFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.removeClaim$).toBeObservable(expected);
    });
  });

  describe('submitClaim$', () => {
    it('should submit claim', () => {
      const action = new fromActions.SubmitClaim({
        userId: OCC_USER_ID_CURRENT,
        claimId: 'testClaim001',
      });
      const completion = new fromActions.SubmitClaimSuccess(claim1);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitClaim$).toBeObservable(expected);
    });

    it('should fail to submit claims', () => {
      spyOn(mockClaimConnector, 'submitClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.SubmitClaim({
        userId: OCC_USER_ID_CURRENT,
        claimId: 'testClaim001',
      });
      const completion = new fromActions.SubmitClaimFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitClaim$).toBeObservable(expected);
    });
  });

  describe('createClaim$', () => {
    it('should create claim', () => {
      const action = new fromActions.CreateClaim({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest003',
        claimData: 'testInsurancePolicy001',
      });
      const loadUserRequestCompletion = new fromUserRequestActions.LoadUserRequestSuccess(
        {
          userId: OCC_USER_ID_CURRENT,
          requestId: 'testRequest003',
        }
      );
      const createClaimCompletion = new fromActions.CreateClaimSuccess(claim3);
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUserRequestCompletion,
        c: createClaimCompletion,
      });

      expect(effects.createClaim$).toBeObservable(expected);
    });

    it('should fail to create claims', () => {
      spyOn(mockClaimConnector, 'createClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.CreateClaim({
        userId: OCC_USER_ID_CURRENT,
        policyId: 'testInsurancePolicy001',
        contractId: 'testInsurancePolicy001',
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
        requestId: 'testRequest001',
        claimData: {
          policeInformed: 'yes',
          witnesses: 'yes',
        },
      });
      const completion = new fromActions.UpdateClaimSuccess(claim3);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateClaim$).toBeObservable(expected);
    });

    it('should update claim with location of loss', () => {
      mockClaimDataService.claimData = claim3;
      const action = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest003',
        claimData: {
          policeInformed: 'yes',
          witnesses: 'yes',
        },
      });
      const completion = new fromActions.UpdateClaimSuccess(claim3);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
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
        requestId: 'testRequest003',
        claimData: {
          policeInformed: 'yes',
          witnesses: 'yes',
        },
      });
      const completion = new fromActions.UpdateClaimSuccess(claim3);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateClaim$).toBeObservable(expected);
    });

    it('should fail to update claims', () => {
      spyOn(mockClaimConnector, 'updateClaim').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest003',
        claimData: {
          policeInformed: 'invalidData',
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
});
