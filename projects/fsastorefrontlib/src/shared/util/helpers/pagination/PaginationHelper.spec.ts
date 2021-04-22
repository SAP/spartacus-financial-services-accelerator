import { TestBed } from '@angular/core/testing';
import { PaginationHelper } from './PaginationHelper';

describe('PaginationHelper', () => {
  let paginationHelper: PaginationHelper;
  const mockCollection = ['0', '1', '2'];
  const mockCollection2 = ['0', '1', '2', '3', '4', '5'];
  const mockCollection3 = ['0', '1'];
  const paginationconfig = {
    pageSize: 2,
    currentPage: 0,
  };
  const paginationconfig2 = {
    pageSize: 2,
    currentPage: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationHelper],
    });
    paginationHelper = TestBed.inject(PaginationHelper);
  });

  describe('transform', () => {
    it('should return results', () => {
      const results = PaginationHelper.getPaginationResults(
        paginationconfig,
        mockCollection
      );
      expect(results.values).not.toBe(null);
      expect(results.values.length).toEqual(2);
    });
    it('should return second page of results', () => {
      const results = PaginationHelper.getPaginationResults(
        paginationconfig2,
        mockCollection2
      );
      expect(results.values).not.toBe(null);
      expect(results.values[0]).toEqual('2');
      expect(results.values[1]).toEqual('3');
    });
    it('should return empty list', () => {
      const results = PaginationHelper.getPaginationResults(
        paginationconfig,
        []
      );
      expect(results.values.length).toBe(0);
    });
    it('should return empty list', () => {
      const results = PaginationHelper.getPaginationResults(
        {
          pageSize: 2,
          currentPage: 1,
        },
        mockCollection3
      );
      expect(results.values.length).not.toBe(0);
      expect(results.pagination.currentPage).toBe(0);
    });
  });
});
