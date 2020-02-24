import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import { of } from 'rxjs';
import { FSProductAssignmentAdapter } from './product-assignment.adapter';
import { FSProductAssignmentConnector } from './product-assignment.connector';
import createSpy = jasmine.createSpy;

class MockProductAssignmentAdapter implements FSProductAssignmentAdapter {
  loadProductAssignmentsForUnit = createSpy().and.callFake(
    (userId, orgUnitId, pageSize, currentPage, sort) =>
      of(
        'loadProductAssignmentsForUnit' +
          userId +
          orgUnitId +
          pageSize +
          currentPage +
          sort
      )
  );
}

describe('FSProductAssignmentConnector', () => {
  let productAssignmentConnector: FSProductAssignmentConnector;
  let productAssignmentAdapter: FSProductAssignmentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FSProductAssignmentAdapter,
          useClass: MockProductAssignmentAdapter,
        },
      ],
    });

    productAssignmentConnector = TestBed.get(
      FSProductAssignmentConnector as Type<FSProductAssignmentConnector>
    );
    productAssignmentAdapter = TestBed.get(FSProductAssignmentAdapter as Type<
      FSProductAssignmentAdapter
    >);
  });

  it('should be created', () => {
    expect(productAssignmentConnector).toBeTruthy();
  });

  it('should call adapter for loadProductAssignmentsForUnit', () => {
    productAssignmentConnector.loadProductAssignmentsForUnit(
      OCC_CART_ID_CURRENT,
      'SAP',
      5,
      1
    );
    expect(
      productAssignmentAdapter.loadProductAssignmentsForUnit
    ).toHaveBeenCalledWith(OCC_CART_ID_CURRENT, 'SAP', 5, 1, undefined);
  });
});
