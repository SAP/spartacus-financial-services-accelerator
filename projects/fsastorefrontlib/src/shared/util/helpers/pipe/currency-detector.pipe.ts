import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService, WindowRef } from '@spartacus/core';
import { combineLatest, iif, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CURRENCY_CODE } from '../../../../core/general-config/default-general-config';

@Pipe({ name: 'currencyDetector' })
export class CurrencyDetectorPipe implements PipeTransform {
  currentCurrency$: Observable<string> = this.currencyService.getActive();

  constructor(
    protected currencyService: CurrencyService,
    protected winRef: WindowRef
  ) {}

  transform(entry: any): Observable<string> {
    const entryCurrencyStream = [of(entry), this.currentCurrency$];

    return combineLatest(entryCurrencyStream).pipe(
      mergeMap(([entry, currency]) =>
        iif(
          () => entry.type === CURRENCY_CODE,
          this.currencyEntry(entry, currency),
          this.defaultEntry(entry)
        )
      )
    );
  }

  private currencyEntry(entry, currency): Observable<string> {
    return of(
      Number(entry.value).toLocaleString(
        this.winRef.nativeWindow.navigator.language,
        {
          style: CURRENCY_CODE,
          currency,
        }
      )
    );
  }

  private defaultEntry(entry): Observable<any> {
    return of(entry.value);
  }
}
