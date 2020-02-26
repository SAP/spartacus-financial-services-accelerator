import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccFSProductAssignmentAdapter } from './occ-product-assignment.adapter';
import { Observable, of } from 'rxjs';

describe('OccFSProductAssignmentAdapter', () => {
  let productAssignmentAdapter: OccFSProductAssignmentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccFSProductAssignmentAdapter],
    });
    productAssignmentAdapter = TestBed.get(
      OccFSProductAssignmentAdapter as Type<OccFSProductAssignmentAdapter>
    );
  });

  it('should be created', () => {
    expect(productAssignmentAdapter).toBeTruthy();
  });
});
