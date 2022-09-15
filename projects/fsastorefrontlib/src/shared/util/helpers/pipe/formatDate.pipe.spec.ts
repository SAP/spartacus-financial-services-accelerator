import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DateConfig } from '../../../../core';
import { FormatDatePipe } from './formatDate.pipe';

const mockDate =
  'Wed Dec 30 2020 18:12:21 GMT+0100 (Central European Standard Time)';
const formattedMockDate = '30/12/2020';
const mockDatePipe = new DatePipe('en');

const mockDateConfig = {
  date: {
    format: 'dd/MM/yyyy',
  },
};

describe('CxFormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormatDatePipe,
        {
          provide: DatePipe,
          useValue: mockDatePipe,
        },
        {
          provide: DateConfig,
          useValue: mockDateConfig,
        },
      ],
    });
    pipe = TestBed.inject(FormatDatePipe);
  });

  describe('transform', () => {
    it('should transform date to custom format', () => {
      expect(pipe.transform(mockDate)).toEqual(formattedMockDate);
    });
  });
});
