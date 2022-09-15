import { TestBed } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { BankingEntryValuePipe } from './banking-entry-value.pipe';

const bankingEntries = [
  { key: 'debit-card-design', value: 'azure' },
  { key: 'minimum-card-amount', value: '1000' },
];

const bankingEntryLabel1 = 'debit-card-design';
const bankingEntryLabel2 = 'minimum-card-amount';
const bankingEntryLabel3 = 'number-of-applicants';

describe('BankingEntryValuePipe', () => {
  let pipe: BankingEntryValuePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BankingEntryValuePipe,
        {
          provide: TranslatePipe,
          useClass: MockTranslatePipe,
        },
      ],
    });
    pipe = TestBed.inject(BankingEntryValuePipe);
  });

  describe('transform', () => {
    it('should transform banking entry to value', () => {
      expect(pipe.transform(bankingEntries, bankingEntryLabel1)).toEqual({
        key: 'debit-card-design',
        value: 'azure',
      });
    });

    it('should transform banking entry to value', () => {
      expect(pipe.transform(bankingEntries, bankingEntryLabel2)).toEqual({
        key: 'minimum-card-amount',
        value: '1000',
      });
    });

    it('should not transform banking entry to value', () => {
      expect(
        pipe.transform(bankingEntries, bankingEntryLabel3)
      ).toBeUndefined();
    });
  });
});
