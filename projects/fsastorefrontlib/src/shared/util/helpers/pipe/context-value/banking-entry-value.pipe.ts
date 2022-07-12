import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';

@Pipe({
  name: 'cxFsBankingEntryValue',
})
export class BankingEntryValuePipe implements PipeTransform {
  constructor(protected translatePipe: TranslatePipe) {}

  transform(bankingEntryList: any[], bankingEntryLabel: string) {
    const bankingEntry = bankingEntryList.find(
      entry => entry.key === bankingEntryLabel
    );
    return bankingEntry;
  }
}
