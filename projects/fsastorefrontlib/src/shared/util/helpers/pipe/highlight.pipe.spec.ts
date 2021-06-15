import { TestBed } from '@angular/core/testing';
import { FSHighlightPipe } from './highlight.pipe';

describe('FSHighlightPipe', () => {
  let pipe: FSHighlightPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FSHighlightPipe],
    });
    pipe = TestBed.inject(FSHighlightPipe);
  });

  describe('transform', () => {
    it('should return text with hightlight', () => {
      expect(pipe.transform('eos 400D', 'eos')).toBe(
        '<span class="highlight">eos</span> 400D'
      );
    });

    it('should not return text with hightlight', () => {
      expect(pipe.transform('eos 400D', 'else')).toBe('eos 400D');
    });

    it('should trim match before replacing hightlight', () => {
      expect(pipe.transform('eos 400D', 'eos ')).toBe(
        '<span class="highlight">eos</span> 400D'
      );

      expect(pipe.transform('eos 400D', ' eos')).toBe(
        '<span class="highlight">eos</span> 400D'
      );
    });

    it('should not return hightlight when there is no match', () => {
      expect(pipe.transform('eos 400D')).toBe('eos 400D');
      expect(pipe.transform('eos 400D', undefined)).toBe('eos 400D');
    });
  });
});
