import { TestBed } from '@angular/core/testing';
import { OccQuoteNormalizer } from './occ-quote-normalizer';

describe('OccQuoteNormalizer', () => {
  let occQuoteNormalizer: OccQuoteNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccQuoteNormalizer],
    });
    occQuoteNormalizer = TestBed.inject(OccQuoteNormalizer);
  });

  it('should be created', () => {
    expect(occQuoteNormalizer).toBeTruthy();
  });

  it('should convert quote', () => {
    occQuoteNormalizer.convert({}, {});
  });

  it('should convert quote when target is undefined', () => {
    occQuoteNormalizer.convert({});
  });
});
