import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ProductAssignmentConnector } from '../../connectors';
import * as fromActions from '../actions';
import { PRODUCT_ASSIGNMENT_FEATURE } from '../product-assignments-state';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './product-assignment.effect';

const mockProductAssignments = {
  assignments: [
    {
      active: true,
      code: 'testOne',
      product: {
        code: 'testProduct',
      },
    },
    {
      active: false,
      code: 'testTwo',
      product: {
        code: 'testProduct',
      },
    },
  ],
  potentialAssignments: [
    {
      active: true,
      code: 'testOne',
      product: {
        code: 'testProduct',
      },
    },
    {
      active: false,
      code: 'testTwo',
      product: {
        code: 'testProduct',
      },
    },
  ],
};
const mockedOrgUnitId = 'SAP';
const pageSize = 5;
const currentPage = 1;
const sortCode = 'name';
const productAssignmentCode = 'testOne';

class MockProductAssignmentConnector {
  loadProductAssignmentsForUnit() {
    return of(mockProductAssignments);
  }
  createProductAssignment() {
    return of(mockProductAssignments);
  }
  removeProductAssignment() {
    return of(mockProductAssignments);
  }
  loadPotentialProductAssignments() {
    return of(mockProductAssignments);
  }
  changeActiveStatus() {
    return of({});
  }
}

describe('Product Assignment Effects', () => {
  let actions$: Observable<fromActions.ProductAssignmentActions>;
  let effects: fromEffects.ProductAssignmentEffects;
  let mockProductAssignmentConnector: MockProductAssignmentConnector;

  beforeEach(() => {
    mockProductAssignmentConnector = new MockProductAssignmentConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: false,
              strictActionImmutability: false,
            },
          }
        ),
        StoreModule.forFeature(
          PRODUCT_ASSIGNMENT_FEATURE,
          fromUserReducers.getReducers()
        ),
      ],
      providers: [
        {
          provide: ProductAssignmentConnector,
          useValue: mockProductAssignmentConnector,
        },
        fromEffects.ProductAssignmentEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.ProductAssignmentEffects);
  });

  describe('loadProductAssignments$', () => {
    it('should load product assignments', () => {
      const action = new fromActions.LoadProductAssignments({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sortCode,
      });
      const completion = new fromActions.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadProductAssignments$).toBeObservable(expected);
    });
  });

  it('should fail to load product assignments', () => {
    spyOn(
      mockProductAssignmentConnector,
      'loadProductAssignmentsForUnit'
    ).and.returnValue(throwError('Error'));
    const action = new fromActions.LoadProductAssignments({
      userId: 'not_valid_user',
      orgUnitId: mockedOrgUnitId,
      pageSize: pageSize,
      currentPage: currentPage,
      sort: sortCode,
    });
    const completion = new fromActions.LoadProductAssignmentsFail({
      error: JSON.stringify('Error'),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.loadProductAssignments$).toBeObservable(expected);
  });

  describe('createProductAssignment$', () => {
    it('should create product assignment', () => {
      const action = new fromActions.CreateProductAssignment({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        productCode: '0001555',
      });
      const completion = new fromActions.CreateProductAssignmentSuccess(
        mockProductAssignments
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.createProductAssignment$).toBeObservable(expected);
    });
  });

  it('should fail to create product assignment', () => {
    spyOn(
      mockProductAssignmentConnector,
      'createProductAssignment'
    ).and.returnValue(throwError('Error'));
    const action = new fromActions.CreateProductAssignment({
      userId: 'not_valid_user',
      orgUnitId: undefined,
      productCode: undefined,
    });
    const completion = new fromActions.CreateProductAssignmentFail({
      error: JSON.stringify('Error'),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.createProductAssignment$).toBeObservable(expected);
  });

  describe('removeProductAssignment$', () => {
    it('should remove product assignment', () => {
      const action = new fromActions.RemoveProductAssignment({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        productCode: '0001555',
        parentOrgUnit: 'SAP',
      });
      const removeProductAssignmentAction =
        new fromActions.RemoveProductAssignmentSuccess();
      const loadPotentialProductAssignmentsAction =
        new fromActions.LoadPotentialProductAssignments({
          occUserId: OCC_USER_ID_CURRENT,
          orgUnitId: mockedOrgUnitId,
        });
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: removeProductAssignmentAction,
        c: loadPotentialProductAssignmentsAction,
      });
      expect(effects.removeProductAssignment$).toBeObservable(expected);
    });
  });

  it('should fail to remove product assignment', () => {
    spyOn(
      mockProductAssignmentConnector,
      'removeProductAssignment'
    ).and.returnValue(throwError('Error'));
    const action = new fromActions.RemoveProductAssignment({
      userId: 'not_valid_user',
      orgUnitId: mockedOrgUnitId,
      productCode: undefined,
    });
    const completion = new fromActions.RemoveProductAssignmentFail({
      error: JSON.stringify('Error'),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.removeProductAssignment$).toBeObservable(expected);
  });

  describe('loadPotentialProductAssignments$', () => {
    it('should load potential product assignments', () => {
      const action = new fromActions.LoadPotentialProductAssignments({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
      });
      const completion = new fromActions.LoadPotentialProductAssignmentsSuccess(
        mockProductAssignments
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPotentialProductAssignments$).toBeObservable(expected);
    });
  });

  describe('changeActiveStatus$', () => {
    it('should change active status', () => {
      const updatedProductAssignment = {
        active: false,
        code: 'testOne',
        product: {
          code: 'testProduct',
        },
      };
      const action = new fromActions.UpdateProductAssignmentSuccess(
        updatedProductAssignment
      );
      expect({ ...action }).toEqual({
        type: fromActions.UPDATE_PRODUCT_ASSIGNMENT_SUCCESS,
        payload: updatedProductAssignment,
      });
    });
  });

  it('should fail to change active status', () => {
    spyOn(mockProductAssignmentConnector, 'changeActiveStatus').and.returnValue(
      throwError('Error')
    );
    const action = new fromActions.UpdateProductAssignment({
      userId: 'not_valid_user',
      orgUnitId: mockedOrgUnitId,
      productAssignmentCode: productAssignmentCode,
      active: false,
    });
    const completion = new fromActions.UpdateProductAssignmentFail({
      error: JSON.stringify('Error'),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.changeActiveStatus$).toBeObservable(expected);
  });
});
