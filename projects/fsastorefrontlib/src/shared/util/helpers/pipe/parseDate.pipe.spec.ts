import { TestBed } from '@angular/core/testing';
import { ParseDatePipe } from './parseDate.pipe';

const mockDate = 'Sun Dec 12 00:00:00 CET 2010';
const formattedMockDate = 'Sun Dec 12 00:00:00 2010';

describe('ParseDatePipe', () => {
  let pipe: ParseDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParseDatePipe],
    });
    pipe = TestBed.inject(ParseDatePipe);
  });

  describe('transform', () => {
    it('should transform CET format of date ', () => {
      expect(pipe.transform(mockDate)).toEqual(new Date(formattedMockDate));
    });

    it('should transform date without CET', () => {
      expect(pipe.transform(formattedMockDate)).toEqual(
        new Date(formattedMockDate)
      );
    });
  });
});
