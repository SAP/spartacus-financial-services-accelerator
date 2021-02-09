import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { SortByProductNamePipe } from './sortByProductName.pipe';
import { FSProduct } from './../../../occ/occ-models/occ.models';

describe('SortByProductNamePipe', () => {
  let pipe: SortByProductNamePipe;

  const productA: FSProduct = {
    name: 'A',
  };
  const productB: FSProduct = {
    name: 'B',
  };
  const productC: FSProduct = {
    name: 'C',
  };

  const mockEntriesUnsorted: OrderEntry[] = [
    {
      product: productA,
    },
    {
      product: productC,
    },
    {
      product: productB,
    },
  ];
  const mockEntriesSorted: OrderEntry[] = [
    {
      product: productA,
    },
    {
      product: productB,
    },
    {
      product: productC,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortByProductNamePipe],
      declarations: [SortByProductNamePipe],
    });
    pipe = TestBed.inject(SortByProductNamePipe);
  });

  describe('transform', () => {
    it('should sort unsorted entries', () => {
      expect(pipe.transform(mockEntriesUnsorted)).toEqual(mockEntriesSorted);
    });

    it('sorted entries should stay the same', () => {
      expect(pipe.transform(mockEntriesSorted)).toEqual(mockEntriesSorted);
    });
  });
});
