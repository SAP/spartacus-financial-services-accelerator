import { filter, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@spartacus/dynamicforms';
import { FormsUtils } from '@spartacus/dynamicforms';
import { ClaimService } from '../../../core/my-account/facade/claim.service';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaimPrefillResolver implements PrefillResolver {
  constructor(protected claimService: ClaimService) {}

  getPrefillValue(fieldPath: string) {
    return combineLatest([
      this.claimService.getCurrentClaim(),
      this.claimService.getLoaded(),
    ]).pipe(
      filter(([_, isLoaded]) => isLoaded),
      map(([claim, _]) => {
        let value = FormsUtils.getValueByPath(fieldPath, claim);
        value = FormsUtils.convertIfDate(value);
        return value;
      })
    );
  }
}
