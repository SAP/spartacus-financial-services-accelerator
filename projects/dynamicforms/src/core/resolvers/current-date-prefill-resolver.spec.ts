import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { CurrentDatePrefillResolver } from './current-date-prefill-resolver';
import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('en');
const currentDate = datePipe.transform(Date.now(), 'yyyy-MM-dd');

describe('CurrentDatePrefillResolver', () => {
  let currentDatePrefilResolver: CurrentDatePrefillResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [DatePipe],
    });

    currentDatePrefilResolver = TestBed.inject(CurrentDatePrefillResolver);
  });

  it('should inject current date resolver', () => {
    expect(currentDatePrefilResolver).toBeTruthy();
  });

  it('should resolve current date', () => {
    let result;
    currentDatePrefilResolver
      .getPrefillValue()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(currentDate);
  });
});
