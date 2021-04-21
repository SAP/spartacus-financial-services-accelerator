import { TestBed } from '@angular/core/testing';
import { PaginationHelper } from './PaginationHelper';

describe('PaginationHelper', () => {
  let paginationHelper: PaginationHelper;
  const mockCollection = ['0', '1', '2'];
  const mockCollection2 = ['0', '1', '2', '3', '4', '5'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationHelper],
    });
    paginationHelper = TestBed.inject(PaginationHelper);
  });

  describe('transform', () => {
    it('should return results', () => {
      const results = PaginationHelper.getPaginationResults(
        2,
        0,
        mockCollection
      );
      expect(results.values).not.toBe(null);
      expect(results.values.length).toEqual(2);
    });
    it('should return second page of results', () => {
      const results = PaginationHelper.getPaginationResults(
        2,
        1,
        mockCollection2
      );
      expect(results.values).not.toBe(null);
      expect(results.values[0]).toEqual('2');
      expect(results.values[1]).toEqual('3');
    });
    it('should return empty list', () => {
      const results = PaginationHelper.getPaginationResults(2, 0, []);
      expect(results.values.length).toBe(0);
    });
  });
});
