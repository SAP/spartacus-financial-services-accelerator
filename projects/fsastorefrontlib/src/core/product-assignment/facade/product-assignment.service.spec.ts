import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { reducerProvider, reducerToken } from '../store/reducers';
import { FSProductAssignmentService } from './product-assignment.service';

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

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}
describe('FSProductAssignmentServiceTest', () => {
  let service: FSProductAssignmentService;
  let store: Store<fromReducer.ProductAssignmentState>;
  let mockAuthService: MockAuthService;

  beforeEach(() => {
    mockAuthService = new MockAuthService();
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('productAssignments', reducerToken),
      ],
      providers: [
        FSProductAssignmentService,
        reducerProvider,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    });

    service = TestBed.get(FSProductAssignmentService as Type<
      FSProductAssignmentService
    >);
    store = TestBed.get(Store as Type<
      Store<fromReducer.ProductAssignmentState>
    >);
    service.user = OCC_CART_ID_CURRENT;
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FSProductAssignmentService is injected', inject(
    [FSProductAssignmentService],
    (productAssignmentService: FSProductAssignmentService) => {
      expect(productAssignmentService).toBeTruthy();
    }
  ));

  it('should be able to get product assignments', () => {
    service.loadProductAssignmentsForUnit(
      mockedOrgUnitId,
      false,
      pageSize,
      currentPage,
      sortCode
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadProductAssignments({
        occUserId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        active: false,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sortCode,
      })
    );
  });

  it('should be able to load product assignments', () => {
    store.dispatch(
      new fromAction.LoadProductAssignmentsSuccess(mockProductAssignments)
    );
    let response;
    service
      .getProductAssignments()
      .subscribe(productAssignments => {
        response = productAssignments;
      })
      .unsubscribe();
    expect(response).toEqual(mockProductAssignments.assignments);
  });

  it('should be able to dispatch product assignment update action', () => {
    service.changeActiveStatus(mockedOrgUnitId, productAssignmentCode, false);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.UpdateProductAssignment({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        productAssignmentCode: productAssignmentCode,
        active: false,
      })
    );
  });

  it('should be able to change active status', () => {
    const updatedProductAssignment = {
      active: false,
      code: 'testOne',
      product: {
        code: 'testProduct',
      },
    };
    store.dispatch(
      new fromAction.LoadProductAssignmentsSuccess(mockProductAssignments)
    );
    store.dispatch(
      new fromAction.UpdateProductAssignmentSuccess(updatedProductAssignment)
    );
    let response;
    service
      .getProductAssignments()
      .subscribe(productAssignments => {
        response = productAssignments;
      })
      .unsubscribe();
    expect(response[0].code).toEqual('testOne');
    expect(response[0].active).toEqual(false);
  });
});
