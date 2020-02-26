import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { FSProductAssignmentConnector } from '../../connectors';
import * as fromActions from '../actions';
import * as fromUserReducers from './../../store/reducers/index';
import { PRODUCT_ASSIGNMENT_FEATURE } from './../reducers/index';
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
  changeActiveStatus() {
    return of({});
  }
}

describe('Product Assignment Effects', () => {
  let actions$: Observable<fromActions.ProductAssignmentActions>;
  let effects: fromEffects.FSProductAssignmentEffects;
  let mockProductAssignmentConnector: MockProductAssignmentConnector;

  beforeEach(() => {
    mockProductAssignmentConnector = new MockProductAssignmentConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_ASSIGNMENT_FEATURE,
          fromUserReducers.getReducers()
        ),
      ],
      providers: [
        {
          provide: FSProductAssignmentConnector,
          useValue: mockProductAssignmentConnector,
        },
        fromEffects.FSProductAssignmentEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.FSProductAssignmentEffects as Type<
      fromEffects.FSProductAssignmentEffects
    >);
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
        payload: updatedProductAssignment
      });
    });
  });

  it('should fail to change active status', () => {
    spyOn(
      mockProductAssignmentConnector,
      'changeActiveStatus'
    ).and.returnValue(throwError('Error'));
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
