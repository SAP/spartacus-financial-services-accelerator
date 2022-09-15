import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { SortByNamePipe } from './sortByName.pipe';
import { FSProduct } from '../../../../occ/occ-models/occ.models';

describe('SortByProductNamePipe', () => {
  let pipe: SortByNamePipe;

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
  const mockEntriesWithoutProducts: OrderEntry[] = [
    {
      product: productA,
    },
    {},
    {},
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortByNamePipe],
      declarations: [SortByNamePipe],
    });
    pipe = TestBed.inject(SortByNamePipe);
  });

  describe('transform', () => {
    it('should sort unsorted entries', () => {
      expect(pipe.transform(mockEntriesUnsorted, 'product', 'name')).toEqual(
        mockEntriesSorted
      );
    });

    it('sorted entries should stay the same', () => {
      expect(pipe.transform(mockEntriesSorted, 'product', 'name')).toEqual(
        mockEntriesSorted
      );
    });

    it('sorted entries should stay the same', () => {
      expect(
        pipe.transform(mockEntriesWithoutProducts, 'product', 'name')
      ).toEqual(mockEntriesWithoutProducts);
    });
  });
});
