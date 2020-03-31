import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccProductAssignmentAdapter } from './occ-product-assignment.adapter';

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const payload = {
  userId: 'TestID',
  orgUnitId: 'AcmeCorp',
  productCode: 'TestCode',
  active: true,
  pageSize: 5,
  currentPage: 1,
  sort: 'asc',
};

describe('OccProductAssignmentAdapter', () => {
  let productAssignmentAdapter: OccProductAssignmentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccProductAssignmentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    productAssignmentAdapter = TestBed.get(OccProductAssignmentAdapter as Type<
      OccProductAssignmentAdapter
    >);
    productAssignmentAdapter = TestBed.get(OccProductAssignmentAdapter);
  });
  describe('Load Product Assignments For Unit', () => {
    it('should load ', async(() => {
      productAssignmentAdapter
        .loadProductAssignmentsForUnit(
          payload.userId,
          payload.orgUnitId,
          payload.active,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .subscribe(res => {});
    }));
  });
  describe('Create Product Assignment', () => {
    it('should create product assignments', async(() => {
      productAssignmentAdapter
        .createProductAssignment(
          payload.userId,
          payload.orgUnitId,
          payload.productCode
        )
        .subscribe(res => {});
    }));
  });
  describe('Remove Product Assignment', () => {
    it('should remove product assignments', async(() => {
      productAssignmentAdapter
        .removeProductAssignment(
          payload.userId,
          payload.orgUnitId,
          payload.productCode
        )
        .subscribe(res => {});
    }));
  });
  describe('Change Active Status', () => {
    it('should change active status', async(() => {
      productAssignmentAdapter
        .changeActiveStatus(
          payload.userId,
          payload.orgUnitId,
          payload.productCode,
          payload.active
        )
        .subscribe(res => {});
    }));
  });
  describe('Fails to Load Product Assignments For Unit', () => {
    it('should not load payload', async(() => {
      productAssignmentAdapter
        .loadProductAssignmentsForUnit(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
        .subscribe(res => {});
    }));
  });
});
