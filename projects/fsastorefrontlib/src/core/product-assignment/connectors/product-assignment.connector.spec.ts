import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import { of } from 'rxjs';
import { FSProductAssignmentAdapter } from './product-assignment.adapter';
import { FSProductAssignmentConnector } from './product-assignment.connector';
import createSpy = jasmine.createSpy;

class MockProductAssignmentAdapter implements FSProductAssignmentAdapter {
  loadProductAssignmentsForUnit = createSpy().and.callFake(
    (userId, orgUnitId, active, pageSize, currentPage, sort) =>
      of(
        'loadProductAssignmentsForUnit' +
          userId +
          orgUnitId +
          active +
          pageSize +
          currentPage +
          sort
      )
  );

  createProductAssignment = createSpy().and.callFake(
    (userId, orgUnitId, productCode) =>
      of('createProductAssignment' + userId + orgUnitId + productCode)
  );

  removeProductAssignment = createSpy().and.callFake(
    (userId, orgUnitId, productCode) =>
      of('removeProductAssignment', userId + orgUnitId + productCode)
  );

  changeActiveStatus = createSpy().and.callFake(
    (userId, orgUnitId, productAssignmentCode, active) =>
      of(
        'changeActiveStatus' +
          userId +
          orgUnitId +
          productAssignmentCode +
          active
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

  it('should call adapter to loadProductAssignmentsForUnit', () => {
    productAssignmentConnector.loadProductAssignmentsForUnit(
      OCC_CART_ID_CURRENT,
      'SAP',
      undefined,
      5,
      1
    );
    expect(
      productAssignmentAdapter.loadProductAssignmentsForUnit
    ).toHaveBeenCalledWith(
      OCC_CART_ID_CURRENT,
      'SAP',
      undefined,
      5,
      1,
      undefined
    );
  });

  it('should call adapter to createProductAssignment', () => {
    productAssignmentConnector.createProductAssignment(
      OCC_CART_ID_CURRENT,
      'SAP',
      '012345'
    );
    expect(
      productAssignmentAdapter.createProductAssignment
    ).toHaveBeenCalledWith(OCC_CART_ID_CURRENT, 'SAP', '012345');
  });

  it('should call adapter to removeProductAssignment', () => {
    productAssignmentConnector.removeProductAssignment(
      OCC_CART_ID_CURRENT,
      'SAP',
      '012345'
    );
    expect(
      productAssignmentAdapter.removeProductAssignment
    ).toHaveBeenCalledWith(OCC_CART_ID_CURRENT, 'SAP', '012345');
  });

  it('should call adapter to changeActiveStatus', () => {
    productAssignmentConnector.changeActiveStatus(
      OCC_CART_ID_CURRENT,
      'SAP',
      'PA-test',
      false
    );
    expect(productAssignmentAdapter.changeActiveStatus).toHaveBeenCalledWith(
      OCC_CART_ID_CURRENT,
      'SAP',
      'PA-test',
      false
    );
  });
});
