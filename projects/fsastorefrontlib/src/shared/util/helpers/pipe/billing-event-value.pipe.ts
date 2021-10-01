import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { OneTimeChargeEntry } from '../../../../occ/occ-models/occ.models';

@Pipe({
  name: 'cxFsBillingEventValue',
})
export class BillingEventValuePipe implements PipeTransform {
  constructor(protected translatePipe: TranslatePipe) {}

  transform(
    billingEventsList: OneTimeChargeEntry[],
    billingEventLabel: string
  ) {
    const billingEvent = billingEventsList.find(
      event => event.billingTime.name === billingEventLabel
    );
    return billingEvent?.price?.value
      ? billingEvent?.price?.formattedValue
      : !billingEvent?.chargeInformation
      ? this.translatePipe.transform('fscommon.notIncluded')
      : billingEvent?.chargeInformation;
  }
}
