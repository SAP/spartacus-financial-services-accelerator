import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
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

describe('FSProductAssignmentServiceTest', () => {
  let service: FSProductAssignmentService;
  let store: Store<fromReducer.ProductAssignmentState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('productAssignments', reducerToken),
      ],
      providers: [FSProductAssignmentService, reducerProvider],
    });

    service = TestBed.get(FSProductAssignmentService as Type<
      FSProductAssignmentService
    >);
    store = TestBed.get(Store as Type<
      Store<fromReducer.ProductAssignmentState>
    >);

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
      OCC_USER_ID_CURRENT,
      mockedOrgUnitId,
      false,
      pageSize,
      currentPage,
      sortCode
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadProductAssignments({
        userId: OCC_USER_ID_CURRENT,
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
    expect(response).toEqual(mockProductAssignments);
  });
});
