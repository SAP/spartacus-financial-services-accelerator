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
import { StateWithProductAssignment } from '../store/product-assignments-state';
import * as fromReducers from '../store/reducers/index';
import { PRODUCT_ASSIGNMENT_FEATURE } from './../store/product-assignments-state';
import { ProductAssignmentService } from './product-assignment.service';

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
      code: 'potential-test',
      product: {
        code: 'testProduct',
      },
    },
    {
      active: false,
      code: 'test-product',
      product: {
        code: 'test-product',
      },
    },
  ],
};
const mockedOrgUnitId = 'SAP';
const pageSize = 5;
const currentPage = 1;
const sortCode = 'name';
const productAssignmentCode = 'testOne';
const parentOrgUnit = 'TestParentOrg';

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}
describe('ProductAssignmentServiceTest', () => {
  let service: ProductAssignmentService;
  let store: Store<StateWithProductAssignment>;
  let mockAuthService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
          fromReducers.getReducers()
        ),
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    });

    service = TestBed.inject(ProductAssignmentService);
    store = TestBed.inject(Store);
    mockAuthService = TestBed.inject(AuthService);
    service.user = OCC_CART_ID_CURRENT;
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if ProductAssignmentService is injected', inject(
    [ProductAssignmentService],
    (productAssignmentService: ProductAssignmentService) => {
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

  it('should be able to get potential product assignments', () => {
    service.loadPotentialProductAssignments(mockedOrgUnitId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadPotentialProductAssignments({
        occUserId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
      })
    );
  });

  it('should be able to create product assignment', () => {
    service.createProductAssignment(mockedOrgUnitId, productAssignmentCode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.CreateProductAssignment({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        productCode: productAssignmentCode,
      })
    );
  });

  it('should be able to remove product assignment', () => {
    service.removeProductAssignment(
      mockedOrgUnitId,
      productAssignmentCode,
      parentOrgUnit
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.RemoveProductAssignment({
        userId: OCC_USER_ID_CURRENT,
        orgUnitId: mockedOrgUnitId,
        productAssignmentCode: productAssignmentCode,
        parentOrgUnit: parentOrgUnit,
      })
    );
  });

  it('should be able to dispatch product assignment update action', () => {
    store.dispatch(
      new fromAction.LoadProductAssignmentsSuccess(mockProductAssignments)
    );
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
